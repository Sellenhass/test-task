import React, { Component } from "react";
import { CURRENCY_SYMBOLS } from "constants/enums";

class CartProductDescription extends Component {
  render() {
    const { currentCurrency, product } = this.props;

    return (
      <div className="cart-page_product-details">
        <div className="cart-page_product-description">
          <span className="cart-page_product-name">{product.name}</span>
          <span className="cart-page_product-price">
            {CURRENCY_SYMBOLS[currentCurrency]}
            {
              product.prices.find((price) => price.currency === currentCurrency)
                .amount
            }
          </span>
        </div>
        <div className="cart-page_product-options">
          {product.selectedOptions.map((option) => (
            <div
              key={`${option.name}_${option.value}`}
              className="cart-page_product-option-wrapper"
            >
              <span>{option.name}</span>
              {option.type === "swatch" ? (
                <div
                  className="cart-page_product-option"
                  style={{
                    backgroundColor: option.value,
                  }}
                />
              ) : (
                <div className="cart-page_product-option">{option.value}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default CartProductDescription;
