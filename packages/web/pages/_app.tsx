import { GlobalStyle, theme, ThemeProvider } from "@medium/ui";
import App, { Container } from "next/app";
import React from "react";
import { ApolloProvider } from "react-apollo";

import withApolloClient from "../lib/with-apollo-client";
import { Navigation } from "../components/Navigation";
import ReactModal from "react-modal";

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
            <Navigation />
            <Component {...pageProps} />
          </ApolloProvider>
        </ThemeProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);
