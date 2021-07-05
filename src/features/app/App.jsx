import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import { Header } from "components";
import { Category, ProductPage, CartPage } from "features";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <main>
          <Switch>
            <Route exact path="/" component={Category} />
            <Route path="/cart" component={CartPage} />
            <Route path="/:category" component={ProductPage} />
          </Switch>
        </main>
      </BrowserRouter>
    );
  }
}

export default App;
