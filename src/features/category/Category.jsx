import React, { Component } from "react";
import withApolloClient from "utils/withApolloClient";
import { Link } from "react-router-dom";
import { categoryQuery } from "utils/queries";
import { connect } from "react-redux";
import { ProductCard } from "components";

class Category extends Component {
  constructor(props) {
    super(props);

    this.state = { products: [] };
  }

  componentDidMount() {
    this.requestProducts();
  }
  componentDidUpdate(prevProps) {
    if (this.props.categoryName !== prevProps.categoryName) {
      this.requestProducts();
    }
  }

  requestProducts() {
    this.props.client
      .query({
        query: categoryQuery,
        variables: { input: { title: this.props.categoryName } },
      })
      .then((result) => {
        this.setState({ products: result.data.category.products });
      });
  }

  render() {
    return (
      <div className="container category">
        <h1 className="category_name">{this.props.categoryName}</h1>
        <div className="category_list">
          {this.state.products.map((product) => (
            <Link
              key={product.name}
              className="category_link"
              to={{
                pathname: `/${this.props.categoryName}/${product.name
                  .split(" ")
                  .join("-")}`,
                state: { product },
              }}
            >
              <ProductCard
                key={product.name}
                {...product}
                selectedCurrency={this.props.selectedCurrency}
              />
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export default connect((state) => ({
  categoryName: state.category.categoryName,
  selectedCurrency: state.header.selectedCurrency,
}))(withApolloClient(Category));
