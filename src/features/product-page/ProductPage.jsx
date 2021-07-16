import React, { Component } from "react";
import { ProductGallery, ProductDescription } from "./components";

class ProductPage extends Component {
  render() {
    const { state } = this.props.location;

    return (
      <div className="product-page container">
        <ProductGallery gallery={state && state.product.gallery} />
        <ProductDescription product={state && state.product} />
      </div>
    );
  }
}

export default ProductPage;
