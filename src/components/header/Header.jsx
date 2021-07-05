import React, { Component } from "react";
import { Navigation, CurrencySwitcher, Cart } from "./components";
import logoImage from "assets/images/logo.svg";

class Header extends Component {
  render() {
    return (
      <header className="header container">
        <Navigation />

        <a href="/" className="logo-link">
          <img src={logoImage} className="logo" alt="logo" />
        </a>

        <div className="d-flex">
          <CurrencySwitcher />
          <Cart />
        </div>
      </header>
    );
  }
}

export default Header;
