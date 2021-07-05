import React, { Component } from "react";
import { CURRENCY_SYMBOLS } from "constants/enums";

class ProductCard extends Component {
  render() {
    return (
      <div className="product-card">
        <div className="product-card_image-wrapper">
          <img
            className="product-card_image"
            alt="product"
            src={this.props.gallery[0]}
          />
        </div>
        <span className="product-card_name">{this.props.name}</span>
        <span className="product-card_price">
          {CURRENCY_SYMBOLS[this.props.selectedCurrency]}
          {
            this.props.prices[
              this.props.prices.findIndex(
                (price) => this.props.selectedCurrency === price.currency
              )
            ].amount
          }
        </span>
      </div>
    );
  }
}

export default ProductCard;
