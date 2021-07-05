import React, { Component } from "react";
import { connect } from "react-redux";
import { cartActions } from "./duck";
import { CURRENCY_SYMBOLS } from "constants/enums";
import { CartProductGallery } from "./components";
import minus from "assets/images/minus.svg";
import plus from "assets/images/plus.svg";

class CartPage extends Component {
  render() {
    return (
      <div className="cart-page container">
        <h1 className="cart-page_title">cart</h1>
        <ul className="cart-page_products-list">
          {this.props.productsInCart.map((product) => (
            <li
              key={`${product.name}_${product.selectedOptions
                .map((option) => JSON.stringify(option))
                .join()}`}
              className="cart-page_product"
            >
              <div className="cart-page_product-details">
                <span className="cart-page_product-name">{product.name}</span>
                <span className="cart-page_product-price">
                  {CURRENCY_SYMBOLS[this.props.currentCurrency]}
                  {
                    product.prices.find(
                      (price) => price.currency === this.props.currentCurrency
                    ).amount
                  }
                </span>
                <div className="d-flex">
                  {product.selectedOptions.map((option) =>
                    option.type === "swatch" ? (
                      <div
                        key={`${option.name}_${option.value}`}
                        className="cart-page_product-option"
                        style={{
                          backgroundColor: option.value,
                        }}
                      />
                    ) : (
                      <div
                        key={`${option.name}_${option.value}`}
                        className="cart-page_product-option"
                      >
                        {option.value}
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className="d-flex">
                <div className="cart-page_product-btns-wrapper">
                  <button
                    className="cart-page_product-btn"
                    onClick={() => this.props.increaseProductAmount(product)}
                  >
                    <img src={plus} alt="plus" />
                  </button>
                  <div className="cart-page_product-amount">
                    {product.amount}
                  </div>
                  <button
                    className="cart-page_product-btn"
                    onClick={() =>
                      product.amount === 1
                        ? this.props.removeFromCart(product)
                        : this.props.decreaseProductAmount(product)
                    }
                  >
                    <img src={minus} alt="minus" />
                  </button>
                </div>

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
