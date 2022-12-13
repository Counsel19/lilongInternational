import * as ACTIONS from "./actions";
import { inintialState } from "./AppContext";

const appReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.TOGGLE_OVERLAY:
      return {
        ...state,
        showOverlay: action.payload.bool,
        overlayIndex: action.payload.overlayIndex,
      };

    case ACTIONS.SET_ERROR:
      return {
        ...state,
        errorMessage: action.payload.errorMessage,
      };
    case ACTIONS.SET_SUCCESS:
      return {
        ...state,
        successMessage: action.payload.successMessage,
      };
    case ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        errorMessage: null,
      };

    case ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload.user,
      };
    case ACTIONS.SET_VIDEO_LINKS:
      return {
        ...state,
        videoLinks: action.payload.videoLinks,
      };
    case ACTIONS.SET_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload.allUsers,
      };
    case ACTIONS.SET_ALL_AFFILIATES:
      return {
        ...state,
        allAffiliates: action.payload.allAffiliates,
      };
    case ACTIONS.SET_PRODUCTS_PAYMENT:
      return {
        ...state,
        productsPayment: action.payload.productsPayment,
        numOfPages: action.payload.numOfPages,
      };
    case ACTIONS.SET_RECENT_PRODUCTS_PAYMENT:
      return {
        ...state,
        recentProductsPayment: action.payload.recentProductsPayment,
      };
    case ACTIONS.SET_PRODUCTS:
      return {
        ...state,
        allProducts: action.payload.allProducts,
        numOfPages: action.payload.numOfPages,
        totalNumProducts: action.payload.totalNumProducts,
      };
    case ACTIONS.SET_DELETE_POMPT:
      return {
        ...state,
        deletePrompt: action.payload.deletePrompt,
      };
    case ACTIONS.SET_STATS:
      return {
        ...state,
        cardsInfo: action.payload.cardsInfo,
        monthlyRevSales: action.payload.monthlyRevSales,
        ordersState: action.payload.ordersState,
        todayStats: action.payload.todayStats,
      };
    case ACTIONS.SET_REPORT_STATS:
      return {
        ...state,
        usersByLocation: action.payload.usersByLocation,
        bestSellingProducts: action.payload.bestSellingProducts,
        purchaseAffiliateMonthlyRep: action.payload.purchaseAffiliateMonthlyRep,
      };
    case ACTIONS.SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload.categories,
      };
    case ACTIONS.SET_TO_PASSWORD_RESET:
      return {
        ...state,
        isPasswordReset: action.payload.isPasswordReset,
      };
    case ACTIONS.SET_EMAIL_SENDING:
      return {
        ...state,
        isEmailSending: action.payload.isEmailSending,
      };
    case ACTIONS.SET_IS_APPLICATION:
      return {
        ...state,
        isApplication: action.payload.isApplication,
      };
    case ACTIONS.HANDLE_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case ACTIONS.CLEAR_MESSAGE:
      return {
        ...state,
        errorMessage: null,
        successMessage: null,
      };
    case ACTIONS.CLEAR_FILTERS:
      return {
        ...state,
        search: "",
        timeFilter: "all",
        orderStatusFilter: "all",
        sort: "all",
        page: null,
        productPriceFilter: "all",
        productCategoryFilter: "all",
        productInstockFilter: "all",
        customerSearch: "",
        affiliatePlanFilter: "all",
        affiliateStatusFilter: "all",
      };

    case ACTIONS.LOGOUT:
      return {
        inintialState,
      };

    case ACTIONS.SET_CART:
      return {
        ...state,
        numOfCartItems: action.payload.totalItemsInCart,
        cartItems: action.payload.cart,
        subTotal: action.payload.subTotal,
      };
    case ACTIONS.SET_ORDERS:
      return {
        ...state,
        userOrders: action.payload.userOrders,
      };
    case ACTIONS.SET_SAVED:
      return {
        ...state,
        numOfSavedItems: action.payload.totalItemsInSaved,
        savedItems: action.payload.saved,
      };

    case ACTIONS.REMOVE_FROM_CART:
      const newCart = state.cartItems.filter(
        (item) => item.id !== action.payload.product.id
      );

      return {
        ...state,
        numOfCartItems: action.payload.totalQuantity,
        cartItems: newCart,
      };

    case ACTIONS.UPDATE_SUBTOTAL:
      return {
        ...state,
        subTotal: action.payload.subTotal,
      };

    case ACTIONS.UPDATE_AFFILIATE_DETAILS:
      return {
        ...state,
        affiliateDetails: {
          ...state.affiliateDetails,
          ...action.payload.affiliateDetails,
        },
      };

    case ACTIONS.START_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case ACTIONS.STOP_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    case ACTIONS.SET_SHOW_DROPDOWN:
      return {
        ...state,
        showDropdown: action.payload.showDropdown,
      };
    case ACTIONS.START_CRITICAL_LOADING:
      return {
        ...state,
        criticalLoading: true,
      };
    case ACTIONS.STOP_CRITICAL_LOADING:
      return {
        ...state,
        criticalLoading: false,
      };

    default:
      return state;
  }
};

export default appReducer;
