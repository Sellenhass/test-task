import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import { currencyQuery } from "utils/queries";
import withApolloClient from "utils/withApolloClient";
import { headerActions } from "components/header/duck";
import { CURRENCY_SYMBOLS } from "constants/enums";
import currencySwitcherArrow from "assets/images/currency-switcher-arrow.svg";
import { CurrencySwitcherPopup } from "./components";

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

  outsideClickHandler() {
    this.setState({
      ...this.state,
      isSwitcherOpened: false,
    });
  }

  toggleCurrencySwitcher() {
    this.setState({
      ...this.state,
      isSwitcherOpened: !this.state.isSwitcherOpened,
    });
  }

  render() {
    const { selectedCurrency, selectCurrency } = this.props;
    const { isSwitcherOpened, currencies } = this.state;

    return (
      <OutsideClickHandler onOutsideClick={() => this.outsideClickHandler()}>
        <div className="currency-switcher">
          <button
            className="currency-switcher_btn"
            onClick={() => this.toggleCurrencySwitcher()}
          >
            {CURRENCY_SYMBOLS[selectedCurrency]}
            <img
              className={classNames("currency-switcher_arrow", {
                "currency-switcher_arrow-rotate": isSwitcherOpened,
              })}
              src={currencySwitcherArrow}
              alt="arrow"
            />
          </button>

          {isSwitcherOpened ? (
            <CurrencySwitcherPopup
              currencies={currencies}
              selectCurrency={selectCurrency}
            />
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
