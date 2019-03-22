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
import { ProfileHero } from "../modules/user/profile/ProfileHero";

interface Props {
  postings: [PostingInfoFragment];
  username: string;
  pictureUrl: string;
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
      pictureUrl: findUser!.pictureUrl,
      postings: findUser!.postings
    };
  }

  render() {
    const { postings, pictureUrl, username } = this.props;

    const context: ContextProps = {
      username: username,
      postings: postings,
      pictureUrl: pictureUrl
    };
    return (
      <Layout title={`${username}`}>
        <PostsContext.Provider value={context}>
          <ProfileHero />
          <ProfileTabs />
        </PostsContext.Provider>
      </Layout>
    );
  }
}
