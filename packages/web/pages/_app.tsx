import { ApolloProvider as ApolloHooksProvider } from "@apollo/react-hooks";
import theme from "components/theme";
import { GlobalStyle } from "components/theme/styled-components-conf";
import AppProviders from "context/app-providers";
import "github-markdown.css";
import withApolloClient from "lib/with-apollo-client";
import App from "next/app";
import NProgress from "nprogress";
// css-sheets
import "prismjs/themes/prism-coy.css";
import "public/static/linkfix.css";
import React from "react";
import { ApolloProvider } from "react-apollo";
import ReactModal from "react-modal";
import { Router } from "server/routes";
import { ThemeProvider } from "styled-components";

if (typeof window !== "undefined") {
  ReactModal.setAppElement("body");
}

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props as any;
    return (
      <>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <ApolloProvider client={apolloClient}>
            <ApolloHooksProvider client={apolloClient}>
              <AppProviders>
                <Component {...pageProps} />
              </AppProviders>
            </ApolloHooksProvider>
          </ApolloProvider>
        </ThemeProvider>
      </>
    );
  }
}

export default withApolloClient(MyApp);
