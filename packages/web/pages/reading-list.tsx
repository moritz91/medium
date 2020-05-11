import { PostingInfoFragment } from "components/apollo-components";
import { Caption } from "components/heading";
import { Layout } from "components/layout";
import { Stream, StreamItem } from "components/stream-item";
import { meQuery } from "graphql/user/query/me";
import React from "react";
import { Link } from "server/routes";
import { NextContextWithApollo } from "types/next-context-with-apollo";

interface ReadingListProps {
  postings: [{ id: string } & PostingInfoFragment];
  hasMore: boolean;
}

export default class ReadingList extends React.Component<ReadingListProps> {
  static async getInitialProps({ apolloClient }: NextContextWithApollo) {
    const response: any = await apolloClient.query({
      query: meQuery,
      variables: {
        withBookmarks: true,
      },
    });

    const postings = response.data.me.bookmarks;

    return { postings };
  }

  render() {
    const { postings, hasMore } = this.props;
    return (
      <Layout title={"Reading List"}>
        <Stream>
          <>
            {postings ? (
              <>
                {postings.map((post) => (
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
                    isBookmark={post.isBookmark}
                    numComments={post.numComments}
                    Link={Link}
                    tags={post.tags}
                    getLinkProps={() => ({
                      route: "post",
                      params: {
                        id: post.id,
                      },
                    })}
                  />
                ))}
              </>
            ) : (
              <Caption>You have currently not bookmarked any stories.</Caption>
            )}
            {hasMore && <div>load more</div>}
          </>
        </Stream>
      </Layout>
    );
  }
}
