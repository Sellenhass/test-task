import React, { Component } from "react";
import arrow from "assets/images/arrow-for-gallery.svg";

class CartProductGallery extends Component {
  constructor(props) {
    super(props);

    this.state = { imageIndex: 0 };
  }
  render() {
    return (
      <div className="cart-page_product-img-wrapper">
        <button
          className="cart-page_product-img-btn-left"
          onClick={() =>
            this.setState(
              this.state.imageIndex !== 0
                ? { imageIndex: this.state.imageIndex - 1 }
                : { imageIndex: this.props.gallery.length - 1 }
            )
          }
        >
          <img
            className="cart-page_btn-image-left"
            src={arrow}
            alt="arrow-left"
          />
        </button>
        <img
          className="cart-page_product-img"
          src={this.props.gallery[this.state.imageIndex]}
          alt="product"
        />
        <button
          className="cart-page_product-img-btn-right"
          onClick={() =>
            this.setState(
              this.state.imageIndex !== this.props.gallery.length - 1
                ? { imageIndex: this.state.imageIndex + 1 }
                : { imageIndex: 0 }
            )
          }
        >
          <img
            className="cart-page_btn-image-right"
            src={arrow}
            alt="arrow-right"
          />
        </button>
      </div>
    );
  }
}

export default CartProductGallery;
