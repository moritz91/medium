import { ApolloQueryResult } from "apollo-client/core/types";
import {
  CommentInfoFragment,
  FindUserByNameQuery,
  PostingInfoFragment,
} from "components/apollo-components";
import { Layout } from "components/layout";
import { PostsContext, PostsContextProps } from "context/post-context";
import { findUserByNameQuery } from "graphql/user/query/user";
import { ProfileTabs } from "modules/profile/profile-tabs";
import { ProfileHero } from "modules/user/profile/profile-hero";
import React from "react";
import { NextContextWithApollo } from "types/next-context-with-apollo";

interface ProfileProps {
  postings: [PostingInfoFragment];
  comments: [CommentInfoFragment];
  username: string;
  pictureUrl: string;
  createdAt: string;
}

export default class Profile extends React.PureComponent<ProfileProps> {
  static async getInitialProps({
    query: { username },
    apolloClient,
  }: NextContextWithApollo) {
    const response: ApolloQueryResult<
      FindUserByNameQuery
    > = await apolloClient.query({
      query: findUserByNameQuery,
      variables: {
        username,
      },
    });

    const { findUserByName } = response.data;

    return {
      username,
      pictureUrl: findUserByName!.pictureUrl,
      createdAt: findUserByName!.createdAt,
      postings: findUserByName!.postings,
      comments: findUserByName!.comments,
    };
  }

  render() {
    const { postings, comments, username, pictureUrl, createdAt } = this.props;

    const context: PostsContextProps = {
      username: username,
      pictureUrl: pictureUrl,
      createdAt: createdAt,
      postings: postings,
      comments: comments,
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
