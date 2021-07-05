import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import { cartActions } from "features/cart-page/duck";
import { CURRENCY_SYMBOLS } from "constants/enums";

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
  render() {
    return (
      <div className="product-description">
        <h1 className="product-description_name">{this.props.product.name}</h1>
        {this.props.product.attributes.map((attribute) => (
          <div key={attribute.id} className="product-description_option">
            <span className="product-description_option-name">
              {attribute.name}
            </span>
            <ul className="product-description_option-list">
              {attribute.items.map((item) =>
                attribute.type === "swatch" ? (
                  <li
                    key={item.id}
                    className={classNames(
                      "product-description_option-item product-description_option-item_color",
                      {
                        "product-description_option-item_active":
                          this.state.selectedOptions.some(
                            (option) =>
                              option.type === attribute.type &&
                              option.name === attribute.name &&
                              option.value === item.value
                          ),
                      }
                    )}
                    style={{ backgroundColor: item.value }}
                    onClick={() =>
                      this.setState({
                        selectedOptions: this.state.selectedOptions.map(
                          (option) =>
                            option.name === attribute.name &&
                            option.type === attribute.type
                              ? { ...option, value: item.value }
                              : option
                        ),
                      })
                    }
                  />
                ) : (
                  <li
                    key={item.id}
                    className={classNames("product-description_option-item", {
                      "product-description_option-item_active":
                        this.state.selectedOptions.some(
                          (option) =>
                            option.type === attribute.type &&
                            option.name === attribute.name &&
                            option.value === item.value
                        ),
                    })}
                    onClick={() =>
                      this.setState({
                        selectedOptions: this.state.selectedOptions.map(
                          (option) =>
                            option.name === attribute.name &&
                            option.type === attribute.type
                              ? { ...option, value: item.value }
                              : option
                        ),
                      })
                    }
                  >
                    {item.value}
                  </li>
                )
              )}
            </ul>
          </div>
        ))}

        <div className="product-description_price-wrapper">
          <span className="product-description_option-name">price</span>
          <span className="product-description_price">
            {CURRENCY_SYMBOLS[this.props.currentCurrency]}
            {
              this.props.product.prices.find(
                (price) => price.currency === this.props.currentCurrency
              ).amount
            }
          </span>
        </div>

        <button
          className="product-description_btn"
          onClick={() =>
            this.props.addToCart({
              ...this.props.product,
              selectedOptions: this.state.selectedOptions,
              amount: 1,
            })
          }
        >
          add to cart
        </button>

        <span
          className="product-description_text"
          dangerouslySetInnerHTML={{ __html: this.props.product.description }}
        />
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
