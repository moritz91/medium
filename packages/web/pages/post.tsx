import * as React from "react";
import { BigCard } from "@medium/ui";
import { Heading } from "rebass";

import { NextContextWithApollo } from "../types/NextContextWithApollo";
import { Link } from "../server/routes";
import { PostContext, ContextProps } from "../components/PostContext";
import { getPostingByIdQuery } from "../graphql/post/query/getPostingById";
import Layout from "../components/Layout";

interface Props {
  id: string;
  path?: string;
  creator: string;
  title: string;
  expression: string;
}

export default class Post extends React.PureComponent<Props> {
  static async getInitialProps({
    query: { id, path },
    apolloClient
  }: NextContextWithApollo) {
    const response: any = await apolloClient.query({
      query: getPostingByIdQuery,
      variables: {
        id
      }
    });

    const { getPostingById } = response.data;

    const expression = `${getPostingById!.creatorId}:${path || ""}`;

    return {
      id,
      path,
      expression,
      creator: getPostingById!.creator,
      title: getPostingById!.title
    };
  }

  renderFilePath = (name: string, path?: string) => {
    if (!path) {
      return null;
    }

    const parts = [name, ...path.split("/")];
    const currentPath: string[] = [];

    return parts.map((part, idx) => {
      if (idx) {
        currentPath.push(part);
      }

      return idx === parts.length - 1 ? (
        <span key={part + idx}>{part}</span>
      ) : (
        // @ts-ignore
        <React.Fragment key={part + idx}>
          {/*
          // @ts-ignore */}
          <Link
            route="post"
            params={{
              id: this.props.id,
              path: [...currentPath] as any
            }}
          >
            <a>{part}</a>
          </Link>
          /
        </React.Fragment>
      );
    });
  };

  render() {
    const { title, path, creator, id } = this.props;
    const context: ContextProps = {
      title,
      path,
      creator,
      postId: id
    };
    return (
      // @ts-ignore
      <Layout title={`Code Review Post: ${title}`}>
        <BigCard>
          <Heading m="0rem" fontFamily="rubik" fontSize={6}>
            {creator}/{title}
          </Heading>
          {path ? null : <PostContext.Provider value={context} />}
        </BigCard>
      </Layout>
    );
  }
}
