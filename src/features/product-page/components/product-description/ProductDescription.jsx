import React, { Component } from "react";
import { connect } from "react-redux";
import { cartActions } from "features/cart-page/duck";
import { CURRENCY_SYMBOLS } from "constants/enums";
import Parser from "html-react-parser";
import { OptionsSelector } from "./components";

class ProductDescription extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOptions: props.product.attributes.map((attribute) => ({
        type: attribute.type,
        value: attribute.items[0].value,
        name: attribute.name,
      })),
    };
  }

  optionsSelectorOnClickHandler(selectedOptions, attribute, item) {
    this.setState({
      selectedOptions: selectedOptions.map((option) =>
        option.name === attribute.name && option.type === attribute.type
          ? { ...option, value: item.value }
          : option
      ),
    });
  }

  addToCartHandler(product, selectedOptions) {
    this.props.addToCart({
      ...product,
      selectedOptions: selectedOptions,
      amount: 1,
    });
  }

  render() {
    const { selectedOptions } = this.state;
    const { product, currentCurrency } = this.props;

    return (
      <div className="product-description">
        <h1 className="product-description_name">{product.name}</h1>
        {product.attributes.map((attribute) => (
          <div key={attribute.id} className="product-description_option">
            <span className="product-description_option-name">
              {attribute.name}
            </span>
            <OptionsSelector
              attribute={attribute}
              selectedOptions={selectedOptions}
              onClickHandler={(item) =>
                this.optionsSelectorOnClickHandler(
                  selectedOptions,
                  attribute,
                  item
                )
              }
            />
          </div>
        ))}

        <div className="product-description_price-wrapper">
          <span className="product-description_option-name">price</span>
          <span className="product-description_price">
            {CURRENCY_SYMBOLS[currentCurrency]}
            {
              product.prices.find((price) => price.currency === currentCurrency)
                .amount
            }
          </span>
        </div>

        {product.inStock ? (
          <button
            className="product-description_btn"
            onClick={() => this.addToCartHandler(product, selectedOptions)}
          >
            add to cart
          </button>
        ) : (
          <div className="product-description_out-of-stock">out of stock</div>
        )}

        <div className="product-description_text">
          {Parser(product.description)}
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({ state, currentCurrency: state.header.selectedCurrency }),
  (dispatch) => ({
    addToCart: (product) => dispatch(cartActions.addToCart(product)),
  })
)(ProductDescription);
