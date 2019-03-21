import * as React from "react";
import { NextContextWithApollo } from "../types/NextContextWithApollo";
import Layout from "../components/Layout";
import { findUserQuery } from "../graphql/user/query/user";
import { PostingInfoFragment } from "../components/apollo-components";
import { ProfileTabs } from "../components/Tabs";
import {
  ContextProps,
  PostsContext
} from "../modules/post/shared/PostsContext";

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

    const context: ContextProps = {
      username: username,
      postings: postings
    };
    return (
      <Layout title={`${username}`}>
        <PostsContext.Provider value={context}>
          <ProfileTabs />
        </PostsContext.Provider>
      </Layout>
    );
  }
}
