import React, { Component } from "react";
import { CURRENCY_SYMBOLS } from "constants/enums";

class CartProductDescription extends Component {
  render() {
    const { currentCurrency, product } = this.props;

    return (
      <div className="cart-page_product-details">
        <span className="cart-page_product-name">{product.name}</span>
        <span className="cart-page_product-price">
          {CURRENCY_SYMBOLS[currentCurrency]}
          {
            product.prices.find((price) => price.currency === currentCurrency)
              .amount
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
    );
  }
}

export default CartProductDescription;
