import * as React from "react";
import { Wrapper, PostRow } from "@medium/ui";

import { NextContextWithApollo } from "../types/NextContextWithApollo";
import { PostContext, ContextProps } from "../components/PostContext";
import { getPostingByIdQuery } from "../graphql/post/query/getPostingById";
import Layout from "../components/Layout";
import { UserInfoFragment } from "../components/apollo-components";
import { userInfoFragment } from "../graphql/user/fragments/UserInfo";
import { Link } from "../server/routes";

interface Props {
  id: string;
  creator: UserInfoFragment;
  title: string;
  body: string;
  createdAt: string;
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
      body: getPostingById!.body,
      createdAt: getPostingById!.createdAt
    };
  }

  render() {
    const { title, creator, body, id, createdAt } = this.props;
    const context: ContextProps = {
      title,
      creator: userInfoFragment,
      postId: id
    };
    return (
      // @ts-ignore
      <Layout title={`Posting: ${title}`}>
        <Wrapper>
          <PostRow
            key={id}
            id={id}
            createdAt={createdAt}
            creator={creator}
            title={title}
            body={body}
            Link={Link}
            getLinkProps={() => {}}
          />
          <PostContext.Provider value={context} />
        </Wrapper>
      </Layout>
    );
  }
}
