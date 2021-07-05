import React, { Component } from "react";
import { ProductGallery, ProductDescription } from "./components";

class ProductPage extends Component {
  render() {
    return (
      <div className="product-page container">
        <ProductGallery
          gallery={
            this.props.location.state &&
            this.props.location.state.product.gallery
          }
        />
        <ProductDescription
          product={
            this.props.location.state && this.props.location.state.product
          }
        />
      </div>
    );
  }
}

export default ProductPage;
