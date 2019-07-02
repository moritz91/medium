import * as React from "react";
import { NextContextWithApollo } from "../types/NextContextWithApollo";
import { Layout } from "../components/layout";
import { findUserQuery } from "../graphql/user/query/user";
import {
  PostingInfoFragment,
  CommentInfoFragment
} from "../components/apollo-components";
import { ProfileTabs } from "../modules/profile/profileTabs";
import {
  PostsContextProps,
  PostsContext
} from "../components/context/PostContext";
import { ProfileHero } from "../modules/user/profile/profileHero";

interface Props {
  postings: [PostingInfoFragment];
  comments: [CommentInfoFragment];
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
      postings: findUser!.postings,
      comments: findUser!.comments
    };
  }

  render() {
    const { postings, comments, pictureUrl, username } = this.props;

    const context: PostsContextProps = {
      username: username,
      postings: postings,
      comments: comments,
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
