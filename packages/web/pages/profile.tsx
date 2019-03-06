import * as React from "react";
import { PostRow } from "@medium/ui";

import { NextContextWithApollo } from "../types/NextContextWithApollo";
import Layout from "../components/Layout";
import { Link } from "../server/routes";
import { findUserQuery } from "../graphql/user/query/user";
import { PostingInfoFragment } from "../components/apollo-components";

interface Props {
  postings: [PostingInfoFragment];
  username: string;
}

export default class Profile extends React.PureComponent<Props> {
  static async getInitialProps({
    query: { username },
    apolloClient
  }: NextContextWithApollo) {
    const response: any = await apolloClient.query({
      query: findUserQuery,
      variables: {
        username
      }
    });

    const { findUser } = response.data;

    return {
      username,
      postings: findUser!.postings
    };
  }

  render() {
    const { postings, username } = this.props;
    return (
      <Layout title={`${username}`}>
        {postings.map(p => (
          // @ts-ignore
          <PostRow
            key={p.id}
            id={p.id}
            createdAt={p.createdAt}
            creator={p.creator}
            title={p.title}
            body={p.body}
            Link={Link}
            getLinkProps={() => ({
              route: "post",
              params: {
                id: p.id
              }
            })}
          />
        ))}
      </Layout>
    );
  }
}
