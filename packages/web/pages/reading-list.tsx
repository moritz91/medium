import * as React from "react";
import { NextContextWithApollo } from "../types/NextContextWithApollo";
import { Layout } from "../components/layout";
import { Link } from "../server/routes";
import { StreamItem, Stream } from "../components/streamItem";
import { meQuery } from "../graphql/user/query/me";
import { PostingInfoFragment } from "../components/apollo-components";
import { Caption } from "../components/heading";

interface ReadingListProps {
  postings: [PostingInfoFragment];
  hasMore: boolean;
}

export default class ReadingList extends React.Component<ReadingListProps> {
  static async getInitialProps({ apolloClient }: NextContextWithApollo) {
    const response: any = await apolloClient.query({
      query: meQuery,
      variables: {
        withBookmarks: true
      }
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
                {postings.map((post: any) => (
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
                    isBookmark={post.isBookmark}
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
