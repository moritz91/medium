import App, { Container } from "next/app";
import React from "react";
import { ApolloProvider } from "react-apollo";

import withApolloClient from "../lib/with-apollo-client";
import { Navigation } from "../components/Navigation";

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props as any;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Navigation />
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);
