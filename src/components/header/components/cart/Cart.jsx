import React, { Component } from "react";
import cartImg from "assets/images/cart-img.svg";
import { connect } from "react-redux";
import { CartPopup } from "./components";

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCartPopupOpened: false,
    };
  }
  render() {
    return (
      <>
        <button
          className="cart_btn"
          onClick={() =>
            this.setState({
              isCartPopupOpened: !this.state.isCartPopupOpened,
            })
          }
        >
          <img src={cartImg} className="cart_btn-image" alt="cart" />

          {this.props.productsInCart.reduce(
            (prevProduct, currProduct) => prevProduct + currProduct.amount,
            0
          ) ? (
            <div className="cart_btn-counter">
              {this.props.productsInCart.reduce(
                (prevProduct, currProduct) => prevProduct + currProduct.amount,
                0
              )}
            </div>
          ) : null}
        </button>

        {this.state.isCartPopupOpened ? (
          <CartPopup
            closePopup={() =>
              this.setState({
                isCartPopupOpened: !this.state.isCartPopupOpened,
              })
            }
          />
        ) : null}
      </>
    );
  }
}

export default connect((state) => ({
  productsInCart: state.cart.productsInCart,
}))(Cart);
