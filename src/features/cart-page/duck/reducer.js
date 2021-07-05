import { handleActions } from "redux-actions";
import { isEqual } from "lodash";
import {
  addToCart,
  increaseProductAmount,
  decreaseProductAmount,
  removeFromCart,
} from "./actions";

const initialState = { productsInCart: [] };
export default handleActions(
  {
    [addToCart]: (state, action) => ({
      ...state,
      productsInCart: state.productsInCart.some(
        (product) =>
          product.name === action.payload.name &&
          isEqual(product.selectedOptions, action.payload.selectedOptions)
      )
        ? state.productsInCart.map((product) =>
            product.name === action.payload.name &&
            isEqual(product.selectedOptions, action.payload.selectedOptions)
              ? { ...product, amount: product.amount + 1 }
              : product
          )
        : [...state.productsInCart, action.payload],
    }),

    [increaseProductAmount]: (state, action) => ({
      ...state,
      productsInCart: state.productsInCart.map((product) =>
        product.name === action.payload.name &&
        isEqual(product.selectedOptions, action.payload.selectedOptions)
          ? { ...product, amount: product.amount + 1 }
          : product
      ),
    }),

    [decreaseProductAmount]: (state, action) => ({
      ...state,
      productsInCart: state.productsInCart.map((product) =>
        product.name === action.payload.name &&
        isEqual(product.selectedOptions, action.payload.selectedOptions)
          ? { ...product, amount: product.amount - 1 }
          : product
      ),
    }),

    [removeFromCart]: (state, action) => ({
      ...state,
      productsInCart: state.productsInCart.filter((product) =>
        product.name === action.payload.name
          ? !isEqual(product.selectedOptions, action.payload.selectedOptions)
          : true
      ),
    }),
  },
  initialState
);
