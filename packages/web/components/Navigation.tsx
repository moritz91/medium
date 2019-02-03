import * as React from "react";
import Link from "next/link";
import { MyButton } from "@medium/ui";
import { NextContextWithApollo } from "../types/NextContextWithApollo";
import gql from "graphql-tag";

export class Navigation extends React.PureComponent {
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
      `
    });

    return response.data.me ? response.data.me : {};
  }

  render() {
    const { pictureUrl } = this.props as any;

    return (
      <div>
        <a href="http://localhost:4000/auth/github">
          <MyButton variant="primary">login with github</MyButton>
        </a>
        <Link as={"/posts"} href={"/posts"}>
          <MyButton variant="primary">
            <a>Posts</a>
          </MyButton>
        </Link>
        <img src={pictureUrl} />
      </div>
    );
  }
}
