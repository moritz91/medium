import * as React from "react";
import { BigCard, Wrapper } from "@medium/ui";
import { Heading, Text, Image } from "rebass";

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
        <Wrapper>
          <BigCard>
            <Heading mb="1rem" fontFamily="rubik" fontSize={3}>
              {title}
            </Heading>
            <Text className={"Body"} fontSize={2} mb="1rem">
              {body}
            </Text>
            <Image src={creator.pictureUrl} borderRadius={3} />
            <Text fontSize={2}>{creator.username}</Text>
            <PostContext.Provider value={context} />
          </BigCard>
        </Wrapper>
      </Layout>
    );
  }
}
