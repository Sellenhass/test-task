import React, { Component } from "react";
import { connect } from "react-redux";
import OutsideClickHandler from "react-outside-click-handler";
import { cartActions } from "features/cart-page/duck";
import { CURRENCY_SYMBOLS } from "constants/enums";
import { Link } from "react-router-dom";
import minus from "assets/images/minus.svg";
import plus from "assets/images/plus.svg";

class CartPopup extends Component {
  render() {
    return (
      <div className="cart-popup_wrapper">
        <OutsideClickHandler onOutsideClick={this.props.closePopup}>
          <div className="cart-popup">
            <span className="cart-popup_name">
              <span className="font-weight-bold">My Bag, </span>
              {this.props.productsInCart.reduce(
                (prevProduct, currProduct) => prevProduct + currProduct.amount,
                0
              )}{" "}
              items
            </span>
            <ul className="cart-popup_products-list">
              {this.props.productsInCart.map((product) => (
                <li
                  key={`${product.name}_${product.selectedOptions
                    .map((option) => JSON.stringify(option))
                    .join()}`}
                  className="cart-popup_product-item"
                >
                  <div className="cart-popup_product-details">
                    <span className="cart-popup_product-name">
                      {product.name}
                    </span>
                    <span className="cart-popup_product-price">
                      {CURRENCY_SYMBOLS[this.props.currentCurrency]}
                      {
                        product.prices.find(
                          (price) =>
                            price.currency === this.props.currentCurrency
                        ).amount
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
                        onClick={() =>
                          this.props.increaseProductAmount(product)
                        }
                      >
                        <img
                          className="cart-popup_product-btn_increase"
                          src={plus}
                          alt="plus"
                        />
                      </button>
                      <div className="cart-popup_product-amount">
                        {product.amount}
                      </div>
                      <button
                        className="cart-popup_product-btn"
                        onClick={() =>
                          product.amount === 1
                            ? this.props.removeFromCart(product)
                            : this.props.decreaseProductAmount(product)
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
              ))}
            </ul>

            <div className="cart-popup_sum">
              <span>Total</span>
              <span>
                {CURRENCY_SYMBOLS[this.props.currentCurrency]}
                {this.props.productsInCart
                  .reduce(
                    (sum, item) =>
                      sum +
                      item.amount *
                        item.prices.find(
                          (price) =>
                            price.currency === this.props.currentCurrency
                        ).amount,
                    0
                  )
                  .toFixed(2)}
              </span>
            </div>

            <div className="cart-popup_btns-wrapper">
              <Link
                className="cart-popup_view-bag"
                to="/cart"
                onClick={this.props.closePopup}
              >
                view bag
              </Link>
              <button className="cart-popup_checkout">check out</button>
            </div>
          </div>
        </OutsideClickHandler>
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
)(CartPopup);
