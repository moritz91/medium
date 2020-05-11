import gql from "graphql-tag";
import React from "react";
import { NextContextWithApollo } from "types/next-context-with-apollo";

export default class Index extends React.PureComponent {
  static async getInitialProps({ apolloClient }: NextContextWithApollo) {
    const response: any = await apolloClient.query({
      query: gql`
        {
          me {
            id
            username
            pictureUrl
            bio
          }
        }
      `,
    });

    return response.data.me ? response.data.me : {};
  }

  render() {
    const { pictureUrl } = this.props as any;
    return <img src={pictureUrl} />;
  }
}
