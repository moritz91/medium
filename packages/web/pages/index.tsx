import * as React from "react";
import { NextContextWithApollo } from "../types/NextContextWithApollo";
import gql from "graphql-tag";

export default class Index extends React.PureComponent {
  static async getInitialProps({ apolloClient }: NextContextWithApollo) {
    await apolloClient.query({
      query: gql`
        {
          me {
            id
            username
            pictureUrl
            bio
          }
        }
      `
    });
  }

  render() {
    return <div>{JSON.stringify(this.props, null, 2)}</div>;
  }
}
