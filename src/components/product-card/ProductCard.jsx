import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import { CURRENCY_SYMBOLS } from "constants/enums";
import { Link } from "react-router-dom";
import { cartActions } from "features/cart-page/duck";
import CartIcon from "assets/images/cart-img.svg";

class ProductCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addToCartButtonVisible: false,
    };
  }

  addToCartHandler(product) {
    this.props.addToCart({
      ...product,
      selectedOptions: product.attributes.map((attribute) => ({
        type: attribute.type,
        value: attribute.items[0].value,
        name: attribute.name,
      })),
      amount: 1,
    });
  }

  render() {
    const { selectedCurrency, product } = this.props;

    return (
      <div
        className="product-card_wrapper"
        onMouseEnter={() => this.setState({ addToCartButtonVisible: true })}
        onMouseLeave={() => this.setState({ addToCartButtonVisible: false })}
      >
        <Link
          key={product.name}
          className="product-card_link"
          to={{
            pathname: `/${product.category}/${product.name
              .split(" ")
              .join("-")}`,
            state: { product },
          }}
        >
          <div
            className={classNames("product-card", {
              "product-card_disabled-color": !product.inStock,
            })}
          >
            <div className="product-card_image-wrapper">
              <img
                className="product-card_image"
                alt="product"
                src={product.gallery[0]}
              />
              {!product.inStock ? (
                <div className="product-card_out-of-stock">out of stock</div>
              ) : null}
            </div>
            <span className="product-card_name">{product.name}</span>
            <span className="product-card_price">
              {CURRENCY_SYMBOLS[selectedCurrency]}
              {
                product.prices[
                  product.prices.findIndex(
                    (price) => selectedCurrency === price.currency
                  )
                ].amount
              }
            </span>
          </div>
        </Link>
        {this.state.addToCartButtonVisible && product.inStock ? (
          <button
            className="product-card_btn"
            onClick={(event) => this.addToCartHandler(product)}
          >
            <img src={CartIcon} alt="cart" className="product-card_btn-icon" />
          </button>
        ) : null}
      </div>
    );
  }
}

export default connect(null, (dispatch) => ({
  addToCart: (product) => dispatch(cartActions.addToCart(product)),
}))(ProductCard);
