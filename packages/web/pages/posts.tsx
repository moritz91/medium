import { ApolloQueryResult } from "apollo-client/core/types";
import { Layout } from "components/layout";
import { Stream, StreamItem } from "components/stream-item";
import { getPostingsQuery } from "graphql/post/query/get-postings";
import { getTagByNameQuery } from "graphql/tag/query/get-tag-by-name";
import React from "react";
import { Link } from "server/routes";
import { NextContextWithApollo } from "types/next-context-with-apollo";

interface PostsProps {
  postings: string[];
  hasMore: boolean;
  tag: string;
}

export default class Posts extends React.Component<PostsProps> {
  static async getInitialProps({ query: { tag }, apolloClient }: NextContextWithApollo) {
    if (tag) {
      const response: ApolloQueryResult<any> = await apolloClient.query({
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
        <Stream>
          <>
            {(
              <>
                {postings?.map((post: any) => (
                  <StreamItem
                    key={post.id}
                    id={post.id}
                    createdAt={post.createdAt}
                    creator={post.creator}
                    previewTitle={post.previewTitle}
                    previewSubtitle={post.previewSubtitle}
                    previewImage={post.previewImage}
                    title={post.title}
                    body={post.body}
                    readingTime={post.readingTime}
                    numComments={post.numComments}
                    isBookmark={post.isBookmark}
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
        </Stream>
      </Layout>
    );
  }
}
