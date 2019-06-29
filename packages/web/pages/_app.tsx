import App, { Container } from "next/app";
import React from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";

import withApolloClient from "../lib/with-apollo-client";
import ReactModal from "react-modal";

import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../components/theme/styled-components";
import theme from "../components/theme";
import "../static/linkfix.css";

if (typeof window !== "undefined") {
  ReactModal.setAppElement("body");
}

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props as any;
    return (
      <Container>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <ApolloProvider client={apolloClient}>
            <ApolloHooksProvider client={apolloClient}>
              <Component {...pageProps} />
            </ApolloHooksProvider>
          </ApolloProvider>
        </ThemeProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);
