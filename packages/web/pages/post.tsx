import * as React from "react";
import { BigCard } from "@medium/ui";
import { Heading } from "rebass";

import { NextContextWithApollo } from "../types/NextContextWithApollo";
import { PostContext, ContextProps } from "../components/PostContext";
import { getPostingByIdQuery } from "../graphql/post/query/getPostingById";
import Layout from "../components/Layout";
import { UserInfoFragment } from "../components/apollo-components";
import { userInfoFragment } from "../graphql/user/fragments/UserInfo";

interface Props {
  id: string;
  creator: UserInfoFragment;
  title: string;
  body: string;
}

export default class Post extends React.PureComponent<Props> {
  static async getInitialProps({
    query: { id },
    apolloClient
  }: NextContextWithApollo) {
    const response: any = await apolloClient.query({
      query: getPostingByIdQuery,
      variables: {
        id
      }
    });

    const { getPostingById } = response.data;

    return {
      id,
      creator: getPostingById!.creator,
      title: getPostingById!.title,
      body: getPostingById!.body
    };
  }

  render() {
    const { title, creator, body, id } = this.props;
    const context: ContextProps = {
      title,
      creator: userInfoFragment,
      postId: id
    };
    return (
      // @ts-ignore
      <Layout title={`Posting: ${title}`}>
        <BigCard>
          <Heading m="0rem" fontFamily="rubik" fontSize={6}>
            {creator.username} / {title}
            <div>{body}</div>
          </Heading>
          <PostContext.Provider value={context} />
        </BigCard>
      </Layout>
    );
  }
}
