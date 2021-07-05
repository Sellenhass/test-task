import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import { currencyQuery } from "utils/queries";
import withApolloClient from "utils/withApolloClient";
import { headerActions } from "components/header/duck";
import { CURRENCY_SYMBOLS } from "constants/enums";
import currencySwitcherArrow from "assets/images/currency-switcher-arrow.svg";

class CurrencySwitcher extends Component {
  constructor(props) {
    super(props);

    this.state = { currencies: [], isSwitcherOpened: false };
  }

  componentDidMount() {
    this.requestProducts();
  }

  requestProducts() {
    this.props.client
      .query({
        query: currencyQuery,
      })
      .then((result) => {
        this.setState({ currencies: result.data.currencies });
      });
  }

  render() {
    return (
      <OutsideClickHandler
        onOutsideClick={() =>
          this.setState({
            ...this.state,
            isSwitcherOpened: false,
          })
        }
      >
        <div className="currency-switcher">
          <button
            className="currency-switcher_btn"
            onClick={() =>
              this.setState({
                ...this.state,
                isSwitcherOpened: !this.state.isSwitcherOpened,
              })
            }
          >
            {CURRENCY_SYMBOLS[this.props.selectedCurrency]}
            <img
              className={classNames("currency-switcher_arrow", {
                "currency-switcher_arrow-rotate": this.state.isSwitcherOpened,
              })}
              src={currencySwitcherArrow}
              alt="arrow"
            />
          </button>

          {this.state.isSwitcherOpened ? (
            <div className="currency-switcher_popup">
              <ul className="currency-switcher_popup-list">
                {this.state.currencies.map((currency) => (
                  <li
                    key={currency}
                    className="currency-switcher_popup-item"
                    onClick={() => this.props.selectCurrency(currency)}
                  >
                    {CURRENCY_SYMBOLS[currency]}
                    {currency}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </OutsideClickHandler>
    );
  }
}

export default connect(
  (state) => ({
    selectedCurrency: state.header.selectedCurrency,
  }),
  (dispatch) => ({
    selectCurrency: (selectedCurrency) =>
      dispatch(headerActions.changeCurrency(selectedCurrency)),
  })
)(withApolloClient(CurrencySwitcher));
