import React, { Component } from "react";
import { connect } from "react-redux";
import OutsideClickHandler from "react-outside-click-handler";
import { CURRENCY_SYMBOLS } from "constants/enums";
import { Link } from "react-router-dom";
import { CartProductsList } from "./components";

class CartPopup extends Component {
  render() {
    const { closePopup, productsInCart, currentCurrency } = this.props;

    return (
      <div className="cart-popup_wrapper">
        <OutsideClickHandler onOutsideClick={closePopup}>
          <div className="cart-popup">
            <span className="cart-popup_name">
              <span className="font-weight-bold">My Bag, </span>
              {productsInCart.reduce(
                (prevProduct, currProduct) => prevProduct + currProduct.amount,
                0
              )}{" "}
              items
            </span>
            <CartProductsList
              productsInCart={productsInCart}
              closePopup={closePopup}
              currentCurrency={currentCurrency}
            />
            <div className="cart-popup_sum">
              <span>Total</span>
              <span>
                {CURRENCY_SYMBOLS[currentCurrency]}
                {productsInCart
                  .reduce(
                    (sum, item) =>
                      sum +
                      item.amount *
                        item.prices.find(
                          (price) => price.currency === currentCurrency
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
                onClick={closePopup}
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

export default connect((state) => ({
  productsInCart: state.cart.productsInCart,
  currentCurrency: state.header.selectedCurrency,
}))(CartPopup);
