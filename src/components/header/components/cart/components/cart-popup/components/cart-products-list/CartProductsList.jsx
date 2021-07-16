import React, { Component } from "react";
import { CartProduct } from "./components";

class CartProductsList extends Component {
  render() {
    const { productsInCart, currentCurrency } = this.props;

    return (
      <ul className="cart-popup_products-list">
        {productsInCart.map((product) => (
          <CartProduct
            key={`${product.name}_${product.selectedOptions
              .map((option) => JSON.stringify(option))
              .join()}`}
            product={product}
            currentCurrency={currentCurrency}
          />
        ))}
      </ul>
    );
  }
}

export default CartProductsList;
