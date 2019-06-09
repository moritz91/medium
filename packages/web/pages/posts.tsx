import * as React from "react";
import { NextContextWithApollo } from "../types/NextContextWithApollo";
import { getPostingsQuery } from "../graphql/post/query/getPostings";
import Layout from "../components/layout";
import { PostRow } from "@medium/ui";
import { Link } from "../server/routes";
import { getTagByNameQuery } from "../graphql/tag/query/getTagByName";

interface Props {
  postings: string[];
  hasMore: boolean;
  tag: string;
}

export default class Posts extends React.Component<Props> {
  static async getInitialProps({
    query: { tag },
    apolloClient
  }: NextContextWithApollo) {
    if (tag) {
      const response: any = await apolloClient.query({
        query: getTagByNameQuery,
        variables: {
          name: tag
        }
      });

      const { getTagByName } = response.data;

      return {
        postings: getTagByName!.postings,
        hasMore: getTagByName!.hasMore,
        tag
      };
    } else {
      const response: any = await apolloClient.query({
        query: getPostingsQuery,
        variables: {
          input: { limit: 6, offset: 0 }
        }
      });

      const { findPostings } = response.data;

      return {
        postings: findPostings!.posts,
        hasMore: findPostings!.hasMore
      };
    }
  }

  render() {
    const { postings, hasMore, tag } = this.props;
    return (
      <Layout title={tag ? tag : "Postings"}>
        <>
          {postings && (
            <>
              {postings.map((post: any) => (
                <PostRow
                  key={post.id}
                  id={post.id}
                  createdAt={post.createdAt}
                  creator={post.creator}
                  previewTitle={post.previewTitle}
                  previewSubtitle={post.previewSubtitle}
                  previewImage={post.previewImage}
                  title={post.title}
                  body={post.body}
                  numComments={post.numComments}
                  Link={Link}
                  tags={post.tags}
                  getLinkProps={() => ({
                    route: "post",
                    params: {
                      id: post.id
                    }
                  })}
                />
              ))}
            </>
          )}
          {hasMore && <div>load more</div>}
        </>
      </Layout>
    );
  }
}
