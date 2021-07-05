import React, { Component } from "react";
import { ApolloConsumer } from "@apollo/client";

function withApolloClient(WrappedComponent) {
  return class extends Component {
    render() {
      return (
        <ApolloConsumer>
          {(client) => <WrappedComponent client={client} {...this.props} />}
        </ApolloConsumer>
      );
    }
  };
}

export default withApolloClient;
