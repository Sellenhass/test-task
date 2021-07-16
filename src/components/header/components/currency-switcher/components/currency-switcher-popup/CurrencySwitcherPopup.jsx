import React, { Component } from "react";
import { CURRENCY_SYMBOLS } from "constants/enums";

class CurrencySwitcherPopup extends Component {
  render() {
    const { currencies, selectCurrency } = this.props;

    return (
      <div className="currency-switcher_popup">
        <ul className="currency-switcher_popup-list">
          {currencies.map((currency) => (
            <li
              key={currency}
              className="currency-switcher_popup-item"
              onClick={() => selectCurrency(currency)}
            >
              {CURRENCY_SYMBOLS[currency]}
              {currency}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default CurrencySwitcherPopup;
