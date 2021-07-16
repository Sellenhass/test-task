import React, { Component } from "react";
import plus from "assets/images/plus.svg";
import minus from "assets/images/minus.svg";

class CartProductAmountControls extends Component {
  render() {
    const {
      product,
      increaseProductAmount,
      removeFromCart,
      decreaseProductAmount,
    } = this.props;

    return (
      <div className="cart-page_product-btns-wrapper">
        <button
          className="cart-page_product-btn"
          onClick={() => increaseProductAmount(product)}
        >
          <img src={plus} alt="plus" />
        </button>
        <div className="cart-page_product-amount">{product.amount}</div>
        <button
          className="cart-page_product-btn"
          onClick={() =>
            product.amount === 1
              ? removeFromCart(product)
              : decreaseProductAmount(product)
          }
        >
          <img src={minus} alt="minus" />
        </button>
      </div>
    );
  }
}

export default CartProductAmountControls;
