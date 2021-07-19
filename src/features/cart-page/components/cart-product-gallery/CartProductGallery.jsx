import React, { Component } from "react";
import arrow from "assets/images/arrow-for-gallery.svg";

class CartProductGallery extends Component {
  constructor(props) {
    super(props);

    this.state = { imageIndex: 0 };
  }

  changeImageLeft(imageIndex, gallery) {
    this.setState(
      imageIndex !== 0
        ? { imageIndex: imageIndex - 1 }
        : { imageIndex: gallery.length - 1 }
    );
  }

  changeImageRight(imageIndex, gallery) {
    this.setState(
      imageIndex !== gallery.length - 1
        ? { imageIndex: imageIndex + 1 }
        : { imageIndex: 0 }
    );
  }

  render() {
    const { gallery } = this.props;
    const { imageIndex } = this.state;

    return (
      <div className="cart-page_product-img-wrapper">
        {gallery.length !== 1 ? (
          <button
            className="cart-page_product-img-btn-left"
            onClick={() => this.changeImageLeft(imageIndex, gallery)}
          >
            <img
              className="cart-page_btn-image-left"
              src={arrow}
              alt="arrow-left"
            />
          </button>
        ) : null}
        <img
          className="cart-page_product-img"
          src={gallery[imageIndex]}
          alt="product"
        />
        {gallery.length !== 1 ? (
          <button
            className="cart-page_product-img-btn-right"
            onClick={() => this.changeImageRight(imageIndex, gallery)}
          >
            <img
              className="cart-page_btn-image-right"
              src={arrow}
              alt="arrow-right"
            />
          </button>
        ) : null}
      </div>
    );
  }
}

export default CartProductGallery;
