import React, { Component } from "react";
import classNames from "classnames";

class OptionsSelector extends Component {
  render() {
    const { attribute, selectedOptions, onClickHandler } = this.props;

    return (
      <ul className="product-description_option-list">
        {attribute.items.map((item) =>
          attribute.type === "swatch" ? (
            <li
              key={item.id}
              className={classNames(
                "product-description_option-item product-description_option-item_color",
                {
                  "product-description_option-item_active":
                    selectedOptions.some(
                      (option) =>
                        option.type === attribute.type &&
                        option.name === attribute.name &&
                        option.value === item.value
                    ),
                }
              )}
              style={{ backgroundColor: item.value }}
              onClick={() => onClickHandler(item)}
            />
          ) : (
            <li
              key={item.id}
              className={classNames("product-description_option-item", {
                "product-description_option-item_active": selectedOptions.some(
                  (option) =>
                    option.type === attribute.type &&
                    option.name === attribute.name &&
                    option.value === item.value
                ),
              })}
              onClick={() => onClickHandler(item)}
            >
              {item.value}
            </li>
          )
        )}
      </ul>
    );
  }
}

export default OptionsSelector;
