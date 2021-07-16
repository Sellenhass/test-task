import React, { Component } from "react";
import { connect } from "react-redux";
import { CURRENCY_SYMBOLS } from "constants/enums";
import { cartActions } from "features/cart-page/duck";
import plus from "assets/images/plus.svg";
import minus from "assets/images/minus.svg";

class CartProduct extends Component {
  render() {
    const {
      currentCurrency,
      increaseProductAmount,
      removeFromCart,
      decreaseProductAmount,
      product,
    } = this.props;

    return (
      <li className="cart-popup_product-item">
        <div className="cart-popup_product-details">
          <span className="cart-popup_product-name">{product.name}</span>
          <span className="cart-popup_product-price">
            {CURRENCY_SYMBOLS[currentCurrency]}
            {
              product.prices.find((price) => price.currency === currentCurrency)
                .amount
            }
          </span>
          <div className="cart-popup_product-options">
            {product.selectedOptions.map((option) =>
              option.type === "swatch" ? (
                <div
                  key={`${option.name}_${option.value}`}
                  style={{
                    backgroundColor: option.value,
                  }}
                  className="cart-popup_product-option"
                />
              ) : (
                <div
                  key={`${option.name}_${option.value}`}
                  className="cart-popup_product-option"
                >
                  {option.value}
                </div>
              )
            )}
          </div>
        </div>

        <div className="d-flex">
          <div className="cart-popup_product-btns-wrapper">
            <button
              className="cart-popup_product-btn"
              onClick={() => increaseProductAmount(product)}
            >
              <img
                className="cart-popup_product-btn_increase"
                src={plus}
                alt="plus"
              />
            </button>
            <div className="cart-popup_product-amount">{product.amount}</div>
            <button
              className="cart-popup_product-btn"
              onClick={() =>
                product.amount === 1
                  ? removeFromCart(product)
                  : decreaseProductAmount(product)
              }
            >
              <img
                className="cart-popup_product-btn_decrease"
                src={minus}
                alt="minus"
              />
            </button>
          </div>
          <div className="cart-popup_img-wrapper">
            <img
              className="cart-popup_img"
              src={product.gallery[0]}
              alt="cart"
            />
          </div>
        </div>
      </li>
    );
  }
}

export default connect(null, (dispatch) => ({
  increaseProductAmount: (product) =>
    dispatch(cartActions.increaseProductAmount(product)),
  decreaseProductAmount: (product) =>
    dispatch(cartActions.decreaseProductAmount(product)),
  removeFromCart: (product) => dispatch(cartActions.removeFromCart(product)),
}))(CartProduct);
