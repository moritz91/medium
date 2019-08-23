import App, { Container } from "next/app";
import React from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "@apollo/react-hooks";

import withApolloClient from "../lib/with-apollo-client";
import ReactModal from "react-modal";

import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../components/theme/styled-components";
import theme from "../components/theme";
import "../static/linkfix.css";
import AppProviders from "../context/AppProviders";
import { Router } from "../server/routes";
import NProgress from "nprogress";

if (typeof window !== "undefined") {
  ReactModal.setAppElement("body");
}

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

class MyApp extends App {
  static async getInitialProps({ Component, ctx }: any) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, apolloClient } = this.props as any;
    return (
      <Container>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <ApolloProvider client={apolloClient}>
            <ApolloHooksProvider client={apolloClient}>
              <AppProviders>
                <Component {...pageProps} />
              </AppProviders>
            </ApolloHooksProvider>
          </ApolloProvider>
        </ThemeProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);
