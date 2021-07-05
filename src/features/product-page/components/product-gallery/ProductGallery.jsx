import React, { Component } from "react";

class ProductGallery extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedImage: this.props.gallery[0] };
  }

  render() {
    return (
      <div className="product-gallery">
        <div className="product-gallery_list">
          {this.props.gallery.map((image) => (
            <div key={image} className="product-gallery_list-img-wrapper">
              <img
                className="product-gallery_list-img"
                onClick={() => this.setState({ selectedImage: image })}
                key={image}
                src={image}
                alt="product"
              />
            </div>
          ))}
        </div>
        <div className="product-gallery_main-img-wrapper">
          <img
            className="product-gallery_main-img"
            src={this.state.selectedImage}
            alt="product main"
          />
        </div>
      </div>
    );
  }
}

export default ProductGallery;
