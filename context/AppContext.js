import { createContext, useContext, useEffect, useReducer } from "react";
import appReducer from "./appReducer";
import * as ACTIONS from "./actions";
import axios from "axios";

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const inintialState = {
  numProductCatPages: 5,
  numProductPerCatPage: 20,
  numOfCartItems: 0,
  cartItems: [],
  subTotal: 0,
  isLoading: false,
  showOverlay: false,
  overlayIndex: null,
  affiliateDetails: null,
  savedProducts: [],
  user: null,
  errorMessage: null,
  successMessgae: "",
};

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, inintialState);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    dispatch({
      type: ACTIONS.SET_USER,
      payload: { user },
    });
  }, []);

  const authFetch = axios.create({
    withCredentials: true,
    baseURL: "/api/",
  });

  const addUserToLocalStorage = ({ user }) => {
    localStorage.setItem("user", JSON.stringify(user));
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
  };

  const handleRegister = async (input) => {
    try {
      dispatch({ type: ACTIONS.START_LOADING });
      const { data } = await axios.post("/api/auth/register", input);
      dispatch({
        type: ACTIONS.SET_USER,
        payload: { user: data.user },
      });
      addUserToLocalStorage({ user: data.user });
      dispatch({ type: ACTIONS.STOP_LOADING });
    } catch (error) {
      handleError(error.response.data.msg);
    }
  };

  const handleLogin = async (input) => {
    try {
      dispatch({ type: ACTIONS.START_LOADING });
      const { data } = await axios.post("/api/auth/login", input);
      dispatch({
        type: ACTIONS.SET_USER,
        payload: { user: data.user },
      });
      handleGetCart();
      console.log(data);
      addUserToLocalStorage({ user: data.user });
      
      dispatch({ type: ACTIONS.STOP_LOADING });
      return data
    } catch (error) {
      dispatch({ type: ACTIONS.STOP_LOADING });
      handleError(error.response.data.msg);
    }
  };

  const handleLogout = async () => {
    try {
      dispatch({ type: ACTIONS.START_LOADING });
      const { data } = await axios.post("/api/auth/logout", input);
      dispatch({ type: ACTIONS.LOGOUT });
      removeUserFromLocalStorage();
      dispatch({ type: ACTIONS.START_LOADING });
  
    } catch (error) {
      dispatch({ type: ACTIONS.STOP_LOADING });
      handleError(error.response.data.msg);
    }
  };

  const isItemInCart = (product) => {
    let itemQuantity = 0;
    state.cartItems.forEach((item) => {
      if (item.id === product.id) {
        itemQuantity = item.quantity;
      }
    });

    return itemQuantity;
  };

  const handleAddToCart = async (product, quantity) => {
    try {
      dispatch({ type: ACTIONS.START_LOADING });

      const currentCartItem = {
        productId: product._id,
        quantity: quantity,
      };

      await authFetch.post("/cart", currentCartItem);

      await handleGetCart();

      dispatch({ type: ACTIONS.STOP_LOADING });
    } catch (error) {
      dispatch({ type: ACTIONS.STOP_LOADING });
      handleError(error.response.data.msg);
    }
  };

  const handleGetCart = async () => {
    console.log("get Cart running");
    try {
      const { data } = await authFetch.get("/cart");
      dispatch({
        type: ACTIONS.SET_CART,
        payload: {
          cart: data.cart,
          totalItemsInCart: data.totalItemsInCart,
          subTotal: data.subTotal,
        },
      });
    } catch (error) {
      handleError(error.response.data.msg);
    }
  };

  //Renove from Cart
  const handleRemoveFromCart = async (cartId) => {
    try {
      dispatch({ type: ACTIONS.START_LOADING });
      await authFetch.delete(`/cart?${cartId}`);

      await handleGetCart();
      dispatch({ type: ACTIONS.STOP_LOADING });
    } catch (error) {
      dispatch({ type: ACTIONS.STOP_LOADING });
      console.log(error.response);
    }
  };

  const handleAddToSaved = (product, quantity) => {
    dispatch({ type: ACTIONS.START_LOADING });
    handleRemoveFromCart(product, quantity);

    const savedProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      actualPrice: product.actualPrice,
      quantity: quantity,
      inStock: product.inStock,
      images: product.images,
    };

    dispatch({
      type: ACTIONS.ADD_TO_SAVED,
      payload: { savedProduct },
    });
    dispatch({ type: ACTIONS.START_LOADING });
  };

  const removeFromSaved = () => {
    dispatch({ type: ACTIONS.START_LOADING });
    dispatch({
      type: ACTIONS.REMOVE_FROM_SAVED,
      payload: { product },
    });
    dispatch({ type: ACTIONS.STOP_LOADING });
  };

  const handleError = (errorMessage) => {
    dispatch({ type: ACTIONS.SET_ERROR, payload: { errorMessage } });
    setTimeout(() => {
      dispatch({ type: ACTIONS.CLEAR_ERROR });
    }, 5000);
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        dispatch,
        handleRemoveFromCart,
        handleAddToSaved,
        removeFromSaved,
        handleAddToCart,
        isItemInCart,
        handleRegister,
        handleError,
        handleLogin,
        handleLogout,
        handleGetCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
