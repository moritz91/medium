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
import { createContext } from "react";

if (typeof window !== "undefined") {
  ReactModal.setAppElement("body");
}

// In case we need global state for user data storage in the future
export const UserContext = createContext(null);

class MyApp extends App {
  static async getInitialProps({ Component, ctx }: any) {
    let pageProps = {};

    // const userProps = await ctx.apolloClient.query({ query: meQuery, variables: {{ withBookmarks: false }} });

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, userProps, apolloClient } = this.props as any;
    return (
      <Container>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <ApolloProvider client={apolloClient}>
            <ApolloHooksProvider client={apolloClient}>
              <UserContext.Provider value={userProps}>
                <Component {...pageProps} />
              </UserContext.Provider>
            </ApolloHooksProvider>
          </ApolloProvider>
        </ThemeProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);
