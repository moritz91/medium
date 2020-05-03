import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "apollo-boost";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import fetch from "isomorphic-unfetch";
import { isBrowser } from "./isBrowser";
import getConfig from "next/config";

const {
  publicRuntimeConfig: { BACKEND_URI_DOCKER, BACKEND_URI },
} = getConfig();

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!isBrowser) {
  (global as any).fetch = fetch;
}

function create(initialState: any, { getToken }: { getToken: () => string }) {
  const adjustedUri =
    !isBrowser && process.env.NODE_ENV === "production"
      ? BACKEND_URI_DOCKER
      : BACKEND_URI;

  const httpLink = createHttpLink({
    // uri: "http://localhost:4000/graphql",
    uri: `http://${adjustedUri}/graphql`,
    credentials: "include",
  });

  const authLink = setContext((_, { headers }) => {
    const token = getToken();
    return {
      headers: { ...headers, authorization: token ? `Bearer ${token}` : "" },
    };
  });

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState || {}),
  });
}

export default function initApollo(
  initialState: any,
  options: { getToken: () => string },
) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!isBrowser) {
    return create(initialState, options);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  return apolloClient;
}
