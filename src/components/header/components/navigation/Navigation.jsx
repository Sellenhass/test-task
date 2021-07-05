import React, { Component } from "react";
import { connect } from "react-redux";
import { categoryActions } from "features/category/duck";
import { CATEGORY_TYPES } from "constants/enums";
import { Link } from "react-router-dom";
import classNames from "classnames";

class Navigation extends Component {
  render() {
    return (
      <nav className="navigation">
        <ul className="navigation_list">
          {Object.keys(CATEGORY_TYPES).map((key) => (
            <li key={key} className="navigation_item">
              <Link
                to="/"
                className={classNames("navigation_link", {
                  "navigation_link-active":
                    this.props.categoryName === CATEGORY_TYPES[key],
                })}
                onClick={() => this.props.changeCategory(CATEGORY_TYPES[key])}
              >
                {CATEGORY_TYPES[key]}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

export default connect(
  (state) => ({
    categoryName: state.category.categoryName,
  }),
  (dispatch) => ({
    changeCategory: (category) =>
      dispatch(categoryActions.changeCategory(category)),
  })
)(Navigation);
