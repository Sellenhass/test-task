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
    const { productsInCart } = this.props;
    const { isCartPopupOpened } = this.state;

    return (
      <>
        <button
          className="cart_btn"
          onClick={() =>
            this.setState({
              isCartPopupOpened: !isCartPopupOpened,
            })
          }
        >
          <img src={cartImg} className="cart_btn-image" alt="cart" />

          {productsInCart.reduce(
            (prevProduct, currProduct) => prevProduct + currProduct.amount,
            0
          ) ? (
            <div className="cart_btn-counter">
              {productsInCart.reduce(
                (prevProduct, currProduct) => prevProduct + currProduct.amount,
                0
              )}
            </div>
          ) : null}
        </button>

        {isCartPopupOpened ? (
          <CartPopup
            closePopup={() =>
              this.setState({
                isCartPopupOpened: false,
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
