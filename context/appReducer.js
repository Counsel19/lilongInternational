import * as ACTIONS from "./actions";

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
        errorMessage: action.payload.errorMessage,
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
    case ACTIONS.ADD_TO_CART:
      return {
        ...state,
        numOfCartItems: action.payload.totalQuantity,
        cartItems: action.payload.shouldAddItem
          ? [...state.cartItems, action.payload.cartItem]
          : [
              ...state.cartItems.slice(0, action.payload.index),
              {
                ...state.cartItems[action.payload.index],
                quantity: action.payload.quantity,
              },
              ...state.cartItems.slice(action.payload.index + 1),
            ],
      };

    case ACTIONS.SET_CART:
      return {
        ...state,
        numOfCartItems: action.payload.totalItemsInCart,
        cartItems: action.payload.cart,
        subTotal: action.payload.subTotal
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

    case ACTIONS.ADD_TO_SAVED:
      return {
        ...state,
        savedProducts: [...state.savedProducts, ...action.payload.savedProduct],
      };

    case ACTIONS.REMOVE_FROM_CART:
      const newSaved = state.savedProducts.filter(
        (item) => item.id !== action.payload.product.id
      );

      return {
        ...state,
        savedProducts: newSaved,
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

    default:
      return state;
  }
};

export default appReducer;
