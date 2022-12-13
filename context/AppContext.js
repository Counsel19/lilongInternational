import { createContext, useContext, useEffect, useReducer } from "react";
import appReducer from "./appReducer";
import * as ACTIONS from "./actions";
import axios from "axios";
import { useSession } from "next-auth/react";

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const inintialState = {
  numOfPages: 1,
  totalNumProducts: 0,
  limit: 8,
  page: 1,
  numOfCartItems: 0,
  numOfSavedItems: 0,
  cartItems: null,
  savedItems: null,
  userOrders: [],
  customers: [],
  productsPayment: null,
  recentProductsPayment: null,
  allProducts: null,
  allAffiliates: null,
  videoLinks: null,
  subTotal: 0,
  isLoading: false,
  criticalLoading: false,
  showOverlay: false,
  showSearchModal: false,
  overlayIndex: null,
  savedProducts: [],
  usersByLocation: null,
  bestSellingProducts: null,
  purchaseAffiliateMonthlyRep: null,
  todayStats: null,
  user: null,
  allUsers: null,
  cardsInfo: null,
  monthlyRevSales: null,
  categories: null,
  ordersState: null,
  errorMessage: null,
  deletePrompt: null,
  successMessage: null,
  isPasswordReset: false,
  isEmailSending: false,
  isApplication: false,
  showDropdown: false,
  timeFilter: "all",
  orderStatusFilter: "all",
  search: "",
  orderSearch: "",
  productPriceFilter: "all",
  productCategoryFilter: "all",
  productInstockFilter: "all",
  affiliatePlanFilter: "all",
  affiliateStatusFilter: "all",
  customerSearch: "",
  sort: "latest",
  sortOptions: [
    { _id: "latest" },
    { _id: "oldest" },
    { _id: "a-z" },
    { _id: "z-a" },
  ],
  currentDeliveryAddress: "",
  currentDeliveryPhone: "",
  deliveryModal: false,
  showMobileNav: false,
  moneyFormat: new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }),
};

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, inintialState);
  const { data: session } = useSession();

  const authFetch = axios.create({
    withCredentials: true,
    baseURL: "/api/",
  });

  authFetch.interceptors.request.use(
    (config) => {
      config.headers = {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      };
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response Interceptor
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },

    async (error) => {
      const err = error.response;
      const originalReq = error.config;

      if (err) {
        if (err.status === 401 && !originalReq._retry) {
          originalReq._retry = true;

          if (session) {
            try {
              await getRefreshToken();
              return await authFetch(originalReq);
            } catch (error) {
              if (error.response && error.response.data) {
                return Promise.reject(error.response.data);
              }

              return Promise.reject(error);
            }
          }
        }
      }

      return Promise.reject(error);
    }
  );

  const initiatePayment = async () => {
    try {
      dispatch({ type: ACTIONS.START_LOADING });
      const requestObj = {
        fullname: `${state.user.firstname} ${state.user.lastname}`,
        amount: state.subTotal,
        email: state.user.email,
      };
      const { data } = await authFetch.post("/payment/pay", requestObj);

      dispatch({ type: ACTIONS.STOP_LOADING });
      return data?.url;
    } catch (error) {
      dispatch({ type: ACTIONS.STOP_LOADING });
      console.log(error);
    }
  };

  const getSideData = async () => {
    let cartData;
    handleGetCart()
      .then(
        (res) =>
          (cartData = res.map((item) => ({
            id: item.productId,
            quantity: item.quantity,
            price: item.price,
            image: item.image,
            name: item.name,
          })))
      )
      .catch((error) => console.log(error));

    const user = await getUser();

    const { currentDeliveryAddress, currentDeliveryPhone } = state;

    const res = {
      cartData,
      deliveryAddress: currentDeliveryAddress || user?.deliveryAddress,
      phone: currentDeliveryPhone || user?.phone,
    };

    return res;
  };

  const verifyPayment = async (ref, payload, sideData) => {
    console.log(sideData, "sideData");
    try {
      let res;
      if (payload) {
        let { data } = await authFetch.post(
          `/payment/verify?ref=${ref}&affiliate=true`,
          payload
        );
        removeAffiliateUser("affiliateUser");
        removeAffiliateUser("affiliateDetails");
        res = data;
      } else {
        const { cartData, phone, deliveryAddress } = sideData;

        if (sideData.cartData.length === 0) {
          handleError("No Items in Cart");
          throw new Error("No Items in Cart");
        }

        let reqPayload = {
          cartData: JSON.stringify(cartData),
          deliveryAddress,
          phone,
        };

        let { data } = await authFetch.post(
          `/payment/verify?ref=${ref}`,
          reqPayload
        );
        res = data;
        await clearCart();
      }

      return res;
    } catch (error) {
      console.log(error);
      dispatch({ type: ACTIONS.STOP_LOADING });
      handleError(error.response?.data?.msg);
    }
  };

  const updateOrderStatus = async (id, payload) => {
    try {
      dispatch({ type: ACTIONS.START_LOADING });

      let { data } = await authFetch.put(`/stats/orders?id=${id}`, {
        orderStatus: payload,
      });

      dispatch({ type: ACTIONS.STOP_LOADING });
      dispatch({
        type: ACTIONS.SET_SUCCESS,
        payload: { successMessage: "Order Updated Successfully" },
      });

      setTimeout(() => {
        clearMessage();
      }, 5000);
      return data;
    } catch (error) {
      dispatch({ type: ACTIONS.STOP_LOADING });
      console.log(error);
    }
  };

  const initiateAffilaitePayment = async (info, price) => {
    try {
      dispatch({ type: ACTIONS.START_LOADING });
      dispatch({
        type: ACTIONS.SET_IS_APPLICATION,
        payload: { isApplication: true },
      });

      const requestObj = {
        fullname: `${info.firstname} ${info.lastname}`,
        amount: Number(price),
        email: info.email,
      };
      const { data } = await authFetch.post(
        "/payment/pay?affiliate=true",
        requestObj
      );

      dispatch({ type: ACTIONS.STOP_LOADING });
      return data?.url;
    } catch (error) {
      dispatch({ type: ACTIONS.STOP_LOADING });
      console.log(error);
    }
  };

  const getRefreshToken = async () => {
    try {
      dispatch({ type: ACTIONS.START_LOADING });
      await axios.get("/api/auth/refresh/");
      dispatch({ type: ACTIONS.STOP_LOADING });
    } catch (error) {
      handleError(error.response?.data?.msg);
      dispatch({ type: ACTIONS.STOP_LOADING });
    }
  };

  const updateUser = async (userPayload) => {
    dispatch({ type: ACTIONS.START_LOADING });

    try {
      const { data } = await authFetch.put("/auth/user", userPayload);
      dispatch({
        type: ACTIONS.SET_USER,
        payload: { user: data.user },
      });

      dispatch({ type: ACTIONS.STOP_LOADING });

      await getUser();

      dispatch({
        type: ACTIONS.SET_SUCCESS,
        payload: { successMessage: "Profile Update Successfully" },
      });

      setTimeout(() => {
        clearMessage();
      }, 5000);
    } catch (error) {
      dispatch({ type: ACTIONS.STOP_LOADING });
      handleError(error.msg);
    }
  };

  const getUser = async () => {
    dispatch({ type: ACTIONS.START_LOADING });
    try {
      const { data } = await authFetch.get("/auth/user");
      dispatch({
        type: ACTIONS.SET_USER,
        payload: { user: data.user },
      });
      await handleGetCart();
      await handleGetOrders(data.user.email);
      await handleGetSaved();

      dispatch({ type: ACTIONS.STOP_LOADING });
      return data?.user;
    } catch (error) {
      dispatch({ type: ACTIONS.STOP_LOADING });
      console.error(error);
    }
  };

  const getReportStats = async () => {
    dispatch({ type: ACTIONS.START_LOADING });
    try {
      const { data } = await authFetch.get("/stats/report-stats/");

      dispatch({
        type: ACTIONS.SET_REPORT_STATS,
        payload: {
          usersByLocation: data.usersByLocation,
          bestSellingProducts: data.bestSellingProducts,
          purchaseAffiliateMonthlyRep: data.purchaseAffiliateMonthlyRep,
        },
      });

      dispatch({ type: ACTIONS.STOP_LOADING });
      return data?.bestSellingProducts;
    } catch (error) {
      dispatch({ type: ACTIONS.STOP_LOADING });
      handleError(error.msg);
    }
  };

  const getStats = async () => {
    try {
      dispatch({ type: ACTIONS.START_LOADING });
      const { data } = await authFetch.get("/stats");

      dispatch({
        type: ACTIONS.SET_STATS,
        payload: {
          cardsInfo: data.cardsInfo,
          monthlyRevSales: data.monthlyFinancialRep,
          ordersState: data.ordersState,
          todayStats: {
            todayRevenue: data.todayRevenue,
            todayPercentRevenue: data.todayPercentRevenue,
          },
        },
      });
      dispatch({ type: ACTIONS.STOP_LOADING });
    } catch (error) {
      dispatch({ type: ACTIONS.STOP_LOADING });
      handleError(error.response?.data?.msg);
    }
  };

  const getRecentProductsPayment = async () => {
    try {
      dispatch({ type: ACTIONS.START_LOADING });
      let { data } = await authFetch.get("/stats/products-payment?sort=latest");

      dispatch({
        type: ACTIONS.SET_RECENT_PRODUCTS_PAYMENT,
        payload: {
          recentProductsPayment: {
            ...data,
          },
        },
      });
      dispatch({ type: ACTIONS.STOP_LOADING });
    } catch (error) {
      dispatch({ type: ACTIONS.STOP_LOADING });
      handleError(error.response?.data?.msg);
    }
  };

  const getProductsPayment = async () => {
    const { search, timeFilter, orderStatusFilter, sort, page, limit } = state;

    try {
      dispatch({ type: ACTIONS.START_LOADING });
      let url = `/stats/products-payment?sort=${sort}&state=${orderStatusFilter}&time=${timeFilter}&page=${page}&limit=${limit}`;
      if (search) {
        url = url + `&search=${search}`;
      }

      let { data } = await authFetch.get(url);

      dispatch({
        type: ACTIONS.SET_PRODUCTS_PAYMENT,
        payload: {
          productsPayment: {
            ...data,
          },
        },
      });
      dispatch({ type: ACTIONS.STOP_LOADING });
    } catch (error) {
      dispatch({ type: ACTIONS.STOP_LOADING });
      handleError(error.response?.data?.msg);
    }
  };
  const getSingleProductsPayment = async (id) => {
    try {
      dispatch({ type: ACTIONS.START_LOADING });

      let { data } = await authFetch.get(`/stats/products-payment/${id}`);

      dispatch({ type: ACTIONS.STOP_LOADING });
      return data;
    } catch (error) {
      dispatch({ type: ACTIONS.STOP_LOADING });
      handleError(error.response?.data?.msg);
    }
  };

  const addProduct = async (payload) => {
    try {
      dispatch({ type: ACTIONS.START_CRITICAL_LOADING });

      const { images, specification } = payload;

      await authFetch.post("/products", {
        ...payload,
        images: JSON.stringify(images),
        specification: JSON.stringify(specification),
      });

      dispatch({
        type: ACTIONS.SET_SUCCESS,
        payload: { successMessage: "Product Added Successfully" },
      });
      await getProducts();
      setTimeout(() => {
        clearMessage();
      }, 5000);

      dispatch({ type: ACTIONS.STOP_CRITICAL_LOADING });
    } catch (error) {
      dispatch({ type: ACTIONS.STOP_CRITICAL_LOADING });
      handleError(error.response?.data?.msg);
    }
  };

  const editProduct = async (payload) => {
    try {
      dispatch({ type: ACTIONS.START_CRITICAL_LOADING });

      const { images, specification } = payload;

      await authFetch.put(`/products/${payload._id}`, {
        ...payload,
        images: JSON.stringify(images),
        specification: JSON.stringify(specification),
      });

      dispatch({
        type: ACTIONS.SET_SUCCESS,
        payload: { successMessage: "Product Edited Successfully" },
      });
      await getProducts();
      setTimeout(() => {
        clearMessage();
      }, 5000);

      dispatch({ type: ACTIONS.STOP_CRITICAL_LOADING });
    } catch (error) {
      dispatch({ type: ACTIONS.STOP_CRITICAL_LOADING });
      handleError(error.response?.data?.msg);
    }
  };

  const getProducts = async () => {
    const {
      search,
      productPriceFilter,
      productCategoryFilter,
      productInstockFilter,
      sort,
      page,
      limit,
    } = state;

    try {
      dispatch({ type: ACTIONS.START_LOADING });

      let url = `/products?sort=${sort}&price=${productPriceFilter}&category=${productCategoryFilter}&instock=${productInstockFilter}&page=${page}&limit=${limit}`;
      if (search) {
        url = url + `&search=${search}`;
      }
      let { data } = await authFetch.get(url);

      const sellingProducts = await getReportStats();

      const { products } = data;
      let allProducts = products.map((product) => {
        const found = sellingProducts.find((item) => item.id === product._id);
        return {
          ...product,
          productRevenue: found ? found.productRevenue : 0,
          percentageProductRev: found ? found.percentageProductRev : 0,
        };
      });

      dispatch({
        type: ACTIONS.SET_PRODUCTS,
        payload: {
          allProducts,
          numOfPages: data.numOfPages,
          totalNumProducts: data.totalNumProducts,
        },
      });
      dispatch({ type: ACTIONS.STOP_LOADING });
    } catch (error) {
      dispatch({ type: ACTIONS.STOP_LOADING });
      handleError(error.response?.data?.msg);
    }
  };

  const deleteProduct = async (id) => {
    try {
      dispatch({ type: ACTIONS.START_LOADING });
      let { data } = await authFetch.delete(`/products/${id}`);
      await getProducts();
      dispatch({
        type: ACTIONS.SET_SUCCESS,
        payload: { successMessage: data.msg },
      });

      setTimeout(() => {
        clearMessage();
      }, 5000);
      dispatch({ type: ACTIONS.STOP_LOADING });
    } catch (error) {
      dispatch({ type: ACTIONS.STOP_LOADING });
      handleError(error.response?.data?.msg);
    }
  };

  const getSingleProduct = async (productId) => {
    try {
      dispatch({ type: ACTIONS.START_LOADING });

      let { data } = await authFetch.get(`/products/${productId}`);

      dispatch({ type: ACTIONS.STOP_LOADING });
      return data;
    } catch (error) {
      dispatch({ type: ACTIONS.STOP_LOADING });
      handleError(error.response?.data?.msg);
    }
  };

  const getAllUsers = async () => {
    const { search, limit, page } = state;

    try {
      dispatch({ type: ACTIONS.START_LOADING });
      let { data } = await authFetch.get(
        !search
          ? `/auth/users?page=${page}&limit=${limit}`
          : `/auth/users?search=${search}&page=${page}&limit=${limit}`
      );
      dispatch({ type: ACTIONS.SET_ALL_USERS, payload: { allUsers: data } });
      dispatch({ type: ACTIONS.STOP_LOADING });
    } catch (error) {
      dispatch({ type: ACTIONS.STOP_LOADING });
      handleError(error.response?.data?.msg);
    }
  };

  const getVideoLinks = async () => {
    try {
      dispatch({ type: ACTIONS.START_LOADING });
      let { data } = await authFetch.get("/video-links");

      dispatch({
        type: ACTIONS.SET_VIDEO_LINKS,
        payload: { videoLinks: data },
      });
      dispatch({ type: ACTIONS.STOP_LOADING });
      return data;
    } catch (error) {
      dispatch({ type: ACTIONS.STOP_LOADING });
      handleError(error.response?.data?.msg);
    }
  };
  const addVideoLink = async (payload) => {
    try {
      dispatch({ type: ACTIONS.START_LOADING });
      let { data } = await authFetch.post("/video-links", payload);
      dispatch({ type: ACTIONS.STOP_LOADING });
      dispatch({
        type: ACTIONS.SET_SUCCESS,
        payload: { successMessage: data.msg },
      });

      setTimeout(() => {
        clearMessage();
      }, 5000);
      return await getVideoLinks();
    } catch (error) {
      dispatch({ type: ACTIONS.STOP_LOADING });
      handleError(error.response?.data?.msg);
    }
  };
  const updateVideoLink = async (id, payload) => {
    try {
      dispatch({ type: ACTIONS.START_LOADING });
      const { data } = await authFetch.productId(
        `/video-links?id=${id}`,
        payload
      );

      dispatch({
        type: ACTIONS.SET_SUCCESS,
        payload: { successMessage: data.msg },
      });

      setTimeout(() => {
        clearMessage();
      }, 5000);
      dispatch({ type: ACTIONS.STOP_LOADING });
      return await getVideoLinks();
    } catch (error) {
      dispatch({ type: ACTIONS.STOP_LOADING });
      handleError(error.response?.data?.msg);
    }
  };
  const deleteVideoLink = async (id) => {
    try {
      dispatch({ type: ACTIONS.START_LOADING });
      const { data } = await authFetch.delete(`/video-links?id=${id}`);
      dispatch({
        type: ACTIONS.SET_SUCCESS,
        payload: { successMessage: data.msg },
      });

      setTimeout(() => {
        clearMessage();
      }, 5000);
      dispatch({ type: ACTIONS.STOP_LOADING });
      return await getVideoLinks();
    } catch (error) {
      dispatch({ type: ACTIONS.STOP_LOADING });
      handleError(error.response?.data?.msg);
    }
  };

  const getAllAffiliates = async () => {
    const {
      search,
      affiliatePlanFilter,
      sort,
      timeFilter,
      affiliateStatusFilter,
      page,
      limit,
    } = state;

    try {
      let url = `/stats/affiliate?sort=${sort}&plan=${affiliatePlanFilter}&time=${timeFilter}&regStatus=${affiliateStatusFilter}&page=${page}&limit=${limit}`;

      if (search) {
        url = url + `&search=${search}`;
      }
      dispatch({ type: ACTIONS.START_LOADING });
      let { data } = await authFetch.get(url);

      dispatch({
        type: ACTIONS.SET_ALL_AFFILIATES,
        payload: { allAffiliates: data },
      });
      dispatch({ type: ACTIONS.STOP_LOADING });
    } catch (error) {
      dispatch({ type: ACTIONS.STOP_LOADING });
      handleError(error.response?.data?.msg);
    }
  };

  const addAffiliateUser = (info, name) => {
    localStorage.setItem(name, JSON.stringify(info));
  };

  const removeAffiliateUser = (name) => {
    localStorage.removeItem(name);
  };

  const completeAffiliateReg = async (payload) => {
    try {
      dispatch({ type: ACTIONS.START_LOADING });
      const { data } = await authFetch.post("/complete-affiliate-reg", payload);
      await getAllAffiliates();
      dispatch({
        type: ACTIONS.SET_SUCCESS,
        payload: { successMessage: "Profile Update Successfully" },
      });

      setTimeout(() => {
        clearMessage();
      }, 5000);
      dispatch({ type: ACTIONS.STOP_LOADING });
      return data.editedAffiliate;
    } catch (error) {
      dispatch({ type: ACTIONS.STOP_LOADING });
      handleError(error.response?.data?.msg);
    }
  };

  const handleApplyAffiliate = async () => {
    const affiliateUser = JSON.parse(localStorage.getItem("affiliateUser"));
    const affiliateDetails = JSON.parse(
      localStorage.getItem("affiliateDetails")
    );
    const url = await initiateAffilaitePayment(
      affiliateUser,
      affiliateDetails.price
    );
    return url;
  };

  const handleRegister = async (input) => {
    try {
      dispatch({ type: ACTIONS.START_LOADING });
      const { data } = await axios.post("/api/auth/register", input);
      dispatch({
        type: ACTIONS.SET_USER,
        payload: { user: data.user },
      });
      await handleGetCart();

      dispatch({ type: ACTIONS.STOP_LOADING });
    } catch (error) {
      dispatch({ type: ACTIONS.STOP_LOADING });
      handleError(error.response?.data?.msg);
    }
  };

  const handleLogin = async ({ input, session }) => {
    try {
      dispatch({ type: ACTIONS.START_LOADING });
      let userData;
      if (session) {
        let { data } = await axios.post(
          "/api/auth/login?google=true",
          session.user
        );
        userData = data;
      } else {
        let { data } = await axios.post("/api/auth/login", input);
        userData = data;
      }
      dispatch({
        type: ACTIONS.SET_USER,
        payload: { user: userData.user },
      });
      await handleGetCart();

      dispatch({ type: ACTIONS.STOP_LOADING });
      return userData;
    } catch (error) {
      dispatch({ type: ACTIONS.STOP_LOADING });
      handleError(error.response?.data?.msg);
    }
  };

  const handleLogout = async () => {
    try {
      dispatch({ type: ACTIONS.START_LOADING });
      const { data } = await authFetch.post("/auth/logout");
      dispatch({ type: ACTIONS.LOGOUT });

      dispatch({ type: ACTIONS.STOP_LOADING });
    } catch (error) {
      dispatch({ type: ACTIONS.STOP_LOADING });
      handleError(error?.response?.data?.msg);
    }
  };

  const handleForgotPassword = async (input) => {
    try {
      dispatch({ type: ACTIONS.START_LOADING });
      const { data } = await axios.post("/api/auth/forgotPassword", input);

      dispatch({ type: ACTIONS.STOP_LOADING });
      return data;
    } catch (error) {
      dispatch({ type: ACTIONS.STOP_LOADING });
      handleError(error?.response?.data?.msg);
    }
  };

  const handleResetPassword = async ({ values, userId, token }) => {
    try {
      dispatch({ type: ACTIONS.START_LOADING });
      const { data } = await axios.post(
        `/api/auth/resetPassword?userId=${userId}&token=${token}`,
        values
      );

      dispatch({ type: ACTIONS.STOP_LOADING });
      return data;
    } catch (error) {
      dispatch({ type: ACTIONS.STOP_LOADING });
      handleError(error?.response?.data?.msg);
    }
  };

  const changePassword = async (userId, payload) => {
    console.log(userId, "userId");
    try {
      dispatch({ type: ACTIONS.START_LOADING });
      const { data } = await axios.post(
        `/api/auth/changePassword?userId=${userId}`,
        payload
      );

      dispatch({ type: ACTIONS.STOP_LOADING });
      dispatch({
        type: ACTIONS.SET_SUCCESS,
        payload: { successMessage: data.msg },
      });

      setTimeout(() => {
        clearMessage();
      }, 5000);
    } catch (error) {
      dispatch({ type: ACTIONS.STOP_LOADING });
      handleError(error?.response?.data?.msg);
    }
  };

  const setToPassordReset = (bool) => {
    dispatch({
      type: ACTIONS.SET_TO_PASSWORD_RESET,
      payload: { isPasswordReset: bool },
    });
  };
  const setEmailSending = (bool) => {
    dispatch({
      type: ACTIONS.SET_EMAIL_SENDING,
      payload: { isEmailSending: bool },
    });
  };

  const isItemInCart = (product) => {
    let itemQuantity = 0;

    state.cartItems?.forEach((item) => {
      if (item.productId === product._id) {
        itemQuantity = item.quantity;
      }
    });

    return itemQuantity;
  };

  const handleAddToCart = async (product, quantity, type) => {
    try {
      dispatch({ type: ACTIONS.START_LOADING });

      const currentCartItem = {
        cartId: product._id,
        productId: product._id,
        quantity: quantity,
      };

      if (type === "fromCart") {
        await authFetch.patch("/cart", currentCartItem);
      } else {
        await authFetch.post("/cart", currentCartItem);
      }

      await handleGetCart();

      dispatch({ type: ACTIONS.STOP_LOADING });
    } catch (error) {
      dispatch({ type: ACTIONS.STOP_LOADING });

      handleError(error.response?.data?.msg);
    }
  };

  const handleAddToSaved = async (product, quantity, type) => {
    try {
      dispatch({ type: ACTIONS.START_LOADING });

      const currentSavedItem = {
        cartId: product._id,
        productId: product._id,
        quantity: quantity,
      };

      if (type === "fromSaved") {
        await authFetch.patch("/saved", currentSavedItem);
      } else {
        await authFetch.post("/saved", currentSavedItem);
      }

      await handleGetSaved();

      dispatch({ type: ACTIONS.STOP_LOADING });
    } catch (error) {
      dispatch({ type: ACTIONS.STOP_LOADING });

      handleError(error.response?.data?.msg);
    }
  };

  const handleGetCart = async () => {
    try {
      dispatch({ type: ACTIONS.START_LOADING });
      const { data } = await authFetch.get("/cart");
      dispatch({
        type: ACTIONS.SET_CART,
        payload: {
          cart: data.cart,
          totalItemsInCart: data.totalItemsInCart,
          subTotal: data.subTotal,
        },
      });
      dispatch({ type: ACTIONS.STOP_LOADING });
      return data.cart;
    } catch (error) {
      dispatch({ type: ACTIONS.STOP_LOADING });
      handleError(error.response?.data.msg);
    }
  };

  const handleGetSaved = async () => {
    try {
      dispatch({ type: ACTIONS.START_LOADING });
      const { data } = await authFetch.get("/saved");
      dispatch({
        type: ACTIONS.SET_SAVED,
        payload: {
          saved: data.saved,
          totalItemsInSaved: data.totalItemsInSaved,
        },
      });
      dispatch({ type: ACTIONS.STOP_LOADING });
      return data.saved;
    } catch (error) {
      dispatch({ type: ACTIONS.STOP_LOADING });
      handleError(error.response?.data.msg);
    }
  };

  const handleGetOrders = async (email) => {
    try {
      dispatch({ type: ACTIONS.START_LOADING });
      let url = `/stats/orders?email=${email}`;
      if (state.orderSearch) {
        url = url + `&search=${state.orderSearch}`;
      }
      const { data } = await authFetch.get(url);

      dispatch({
        type: ACTIONS.SET_ORDERS,
        payload: {
          userOrders: data,
        },
      });
      dispatch({ type: ACTIONS.STOP_LOADING });
      return data.userOrders;
    } catch (error) {
      dispatch({ type: ACTIONS.STOP_LOADING });
      handleError(error.response?.data.msg);
    }
  };

  //Renove from Cart
  const handleRemoveFromCart = async (cartId) => {
    try {
      dispatch({ type: ACTIONS.START_LOADING });
      await authFetch.delete(`/cart?cartId=${cartId}`);

      await handleGetCart();
      dispatch({ type: ACTIONS.STOP_LOADING });
    } catch (error) {
      dispatch({ type: ACTIONS.STOP_LOADING });
      console.log(error.response);
    }
  };

  const handleRemoveFromSaved = async (savedId) => {
    try {
      dispatch({ type: ACTIONS.START_LOADING });
      await authFetch.delete(`/saved?savedId=${savedId}`);

      await handleGetSaved();
      dispatch({ type: ACTIONS.STOP_LOADING });
    } catch (error) {
      dispatch({ type: ACTIONS.STOP_LOADING });
      console.log(error.response);
    }
  };

  const clearCart = async () => {
    try {
      dispatch({ type: ACTIONS.START_LOADING });
      await authFetch.delete(`/cart`);

      await handleGetCart();
      dispatch({ type: ACTIONS.STOP_LOADING });
    } catch (error) {
      dispatch({ type: ACTIONS.STOP_LOADING });
      console.log(error.response);
    }
  };

  const addNewCategory = async (payload) => {
    try {
      dispatch({ type: ACTIONS.START_LOADING });
      await authFetch.post(`/category`, payload);
      await getCategories();
      dispatch({ type: ACTIONS.STOP_LOADING });
    } catch (error) {
      dispatch({ type: ACTIONS.STOP_LOADING });
      console.log(error.response);
      handleError(error.response?.data.msg);
    }
  };
  const getCategories = async () => {
    try {
      dispatch({ type: ACTIONS.START_LOADING });
      const { data } = await axios.get(`/api/category`);
      dispatch({
        type: ACTIONS.SET_CATEGORIES,
        payload: { categories: data },
      });

      dispatch({ type: ACTIONS.STOP_LOADING });
    } catch (error) {
      dispatch({ type: ACTIONS.STOP_LOADING });
      console.log(error.response);
      handleError(error.response?.data.msg);
    }
  };

  const removeFromSaved = () => {
    dispatch({ type: ACTIONS.START_LOADING });
    dispatch({
      type: ACTIONS.REMOVE_FROM_SAVED,
      payload: { product },
    });
    dispatch({ type: ACTIONS.STOP_LOADING });
  };
  const handleInputChange = (name, value) => {
    dispatch({ type: ACTIONS.HANDLE_CHANGE, payload: { name, value } });
  };

  const clearFilters = () => {
    dispatch({ type: ACTIONS.CLEAR_FILTERS });
  };

  const handleSetShowDropdown = (bool) => {
    dispatch({
      type: ACTIONS.SET_SHOW_DROPDOWN,
      payload: { showDropdown: bool },
    });
  };
  const handleSetDeletePrompt = (data) => {
    dispatch({
      type: ACTIONS.SET_DELETE_POMPT,
      payload: { deletePrompt: data },
    });
  };

  const handleError = (errorMessage) => {
    dispatch({ type: ACTIONS.SET_ERROR, payload: { errorMessage } });
    setTimeout(() => {
      dispatch({ type: ACTIONS.CLEAR_ERROR });
    }, 5000);
  };
  const clearMessage = () => {
    dispatch({ type: ACTIONS.CLEAR_MESSAGE });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        dispatch,
        handleRemoveFromCart,
        handleRemoveFromSaved,
        handleAddToSaved,
        deleteProduct,
        removeFromSaved,
        handleAddToCart,
        isItemInCart,
        handleSetDeletePrompt,
        handleRegister,
        handleError,
        handleLogin,
        getUser,
        updateUser,
        handleLogout,
        getRefreshToken,
        handleGetCart,
        handleGetOrders,
        initiatePayment,
        verifyPayment,
        updateOrderStatus,
        handleForgotPassword,
        handleResetPassword,
        changePassword,
        setToPassordReset,
        setEmailSending,
        handleInputChange,
        clearMessage,
        handleApplyAffiliate,
        completeAffiliateReg,
        addAffiliateUser,
        getStats,
        getProductsPayment,
        getSingleProductsPayment,
        clearFilters,
        getRecentProductsPayment,
        getProducts,
        getAllUsers,
        getAllAffiliates,
        addProduct,
        editProduct,
        getReportStats,
        addNewCategory,
        getCategories,
        getVideoLinks,
        addVideoLink,
        updateVideoLink,
        deleteVideoLink,
        getSingleProduct,
        handleSetShowDropdown,
        getSideData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
