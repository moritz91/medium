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
          <MyButton variant="github">login with github</MyButton>
        </a>
        <Link as={"/posts"} href={"/posts"}>
          <MyButton variant="form">
            <a>Posts</a>
          </MyButton>
        </Link>
        <Link as={"/create-post"} href={"/create-post"}>
          <MyButton variant="form">
            <a>Create post</a>
          </MyButton>
        </Link>
        <img src={pictureUrl} />
      </div>
    );
  }
}
