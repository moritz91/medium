import * as React from "react";
import { BigCard } from "@medium/ui";
import { Heading } from "rebass";

import { NextContextWithApollo } from "../types/NextContextWithApollo";
import { PostContext, ContextProps } from "../components/PostContext";
import { getPostingByIdQuery } from "../graphql/post/query/getPostingById";
import Layout from "../components/Layout";

interface Props {
  id: string;
  creator: string;
  title: string;
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
      title: getPostingById!.title
    };
  }

  render() {
    const { title, creator, id } = this.props;
    const context: ContextProps = {
      title,
      creator,
      postId: id
    };
    return (
      // @ts-ignore
      <Layout title={`Posting: ${title}`}>
        <BigCard>
          <Heading m="0rem" fontFamily="rubik" fontSize={6}>
            {/* {creator}/{title} */}
          </Heading>
          <PostContext.Provider value={context} />
        </BigCard>
      </Layout>
    );
  }
}
