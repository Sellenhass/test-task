import React, { Component } from "react";
import { connect } from "react-redux";
import { cartActions } from "./duck";
import {
  CartProductGallery,
  CartProductDescription,
  CartProductAmountControls,
} from "./components";

class CartPage extends Component {
  render() {
    const {
      currentCurrency,
      productsInCart,
      increaseProductAmount,
      removeFromCart,
      decreaseProductAmount,
    } = this.props;

    return (
      <div className="cart-page container">
        <h1 className="cart-page_title">cart</h1>
        <ul className="cart-page_products-list">
          {productsInCart.map((product) => (
            <li
              key={`${product.name}_${product.selectedOptions
                .map((option) => JSON.stringify(option))
                .join()}`}
              className="cart-page_product"
            >
              <CartProductDescription
                product={product}
                currentCurrency={currentCurrency}
              />

              <div className="d-flex">
                <CartProductAmountControls
                  product={product}
                  increaseProductAmount={increaseProductAmount}
                  removeFromCart={removeFromCart}
                  decreaseProductAmount={decreaseProductAmount}
                />
                <CartProductGallery gallery={product.gallery} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    productsInCart: state.cart.productsInCart,
    currentCurrency: state.header.selectedCurrency,
  }),
  (dispatch) => ({
    increaseProductAmount: (product) =>
      dispatch(cartActions.increaseProductAmount(product)),
    decreaseProductAmount: (product) =>
      dispatch(cartActions.decreaseProductAmount(product)),
    removeFromCart: (product) => dispatch(cartActions.removeFromCart(product)),
  })
)(CartPage);
