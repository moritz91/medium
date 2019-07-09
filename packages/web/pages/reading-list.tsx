import * as React from "react";
import { NextContextWithApollo } from "../types/NextContextWithApollo";
import { Layout } from "../components/layout";
import { Link } from "../server/routes";
import { StreamItem, Stream } from "../components/streamItem";
import { meQuery } from "../graphql/user/query/me";

interface Props {
  postings: string[];
  hasMore: boolean;
}

export default class ReadingList extends React.Component<Props> {
  static async getInitialProps({ apolloClient }: NextContextWithApollo) {
    const response: any = await apolloClient.query({
      query: meQuery,
      variables: {
        withBookmarks: true
      }
    });

    console.log(response.data.me.bookmarks);

    return;
  }

  render() {
    const { postings, hasMore } = this.props;
    return (
      <Layout title={"Reading List"}>
        <Stream>
          <>
            {postings && (
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
        </Stream>
      </Layout>
    );
  }
}
