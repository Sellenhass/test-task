import React, { Component } from "react";
import withApolloClient from "utils/withApolloClient";
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
    const { products } = this.state;
    const { categoryName, selectedCurrency } = this.props;

    return (
      <div className="container category">
        <h1 className="category_name">{categoryName}</h1>
        <div className="category_list">
          {products.map((product) => (
            <ProductCard
              key={product.name}
              product={product}
              selectedCurrency={selectedCurrency}
            />
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
