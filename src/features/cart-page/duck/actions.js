import { createActions } from "redux-actions";

export const {
  cart: {
    addToCart,
    increaseProductAmount,
    decreaseProductAmount,
    removeFromCart,
  },
} = createActions({
  CART: {
    ADD_TO_CART: undefined,
    INCREASE_PRODUCT_AMOUNT: undefined,
    DECREASE_PRODUCT_AMOUNT: undefined,
    REMOVE_FROM_CART: undefined,
  },
});
