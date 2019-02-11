import { GlobalStyle, theme, ThemeProvider } from "@medium/ui";
import App, { Container } from "next/app";
import React from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";

import withApolloClient from "../lib/with-apollo-client";
import { Navigation } from "../components/Navigation";
import ReactModal from "react-modal";
import { Footer } from "../components/Footer";

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
              <Navigation />
              <Component {...pageProps} />
              <Footer />
            </ApolloHooksProvider>
          </ApolloProvider>
        </ThemeProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);
