import React from "react";
import { NextContextWithApollo } from "../types/NextContextWithApollo";
import { getPostingByIdQuery } from "../graphql/post/query/getPostingById";
import { Layout } from "../components/layout";
import { Comment } from "../components/comment";
import {
  UserInfoFragment,
  GetCommentsByIdComponent,
  TagInfoFragment
} from "../components/apollo-components";
import { Link } from "../server/routes";
import { Text, Box } from "rebass";
import {
  PostContextProps,
  PostContext
} from "../components/context/PostContext";
import { MarkdownRenderer } from "../modules/post/shared/markdownEditor/markdownRenderer";
import { CreatePostingReply } from "../modules/comment/createComment";
import { Story } from "../components/story";
import { Waypoint } from "react-waypoint";
import { getCommentsByIdQuery } from "../graphql/comment/query/getCommentsById";

interface Props {
  id: string;
  creator: UserInfoFragment;
  previewTitle: string;
  previewSubtitle: string;
  previewImage: string;
  title: string;
  body: string;
  numComments: number;
  createdAt: string;
  tags: TagInfoFragment;
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
      previewTitle: getPostingById!.previewTitle,
      previewSubtitle: getPostingById!.previewSubtitle,
      previewImage: getPostingById!.previewImage,
      creator: getPostingById!.creator,
      title: getPostingById!.title,
      body: getPostingById!.body,
      numComments: getPostingById!.numComments,
      createdAt: getPostingById!.createdAt,
      tags: getPostingById!.tags
    };
  }

  render() {
    const {
      previewTitle,
      previewSubtitle,
      title,
      creator,
      body,
      id,
      createdAt,
      numComments,
      tags
    } = this.props;
    const context: PostContextProps = {
      title,
      creator,
      postingId: id
    };

    return (
      // @ts-ignore
      <Layout title={`${title}`}>
        <PostContext.Provider value={context}>
          <Story
            key={id}
            id={id}
            createdAt={createdAt}
            creator={creator}
            previewTitle={previewTitle}
            previewSubtitle={previewSubtitle}
            title={title}
            body={body}
            numComments={numComments}
            Link={Link}
            tags={tags}
            getLinkProps={() => ({
              route: "post",
              params: {
                id: id
              }
            })}
          />
          <Box my="1.5rem">
            <Text fontSize={5}>Responses</Text>
          </Box>
          <CreatePostingReply onEditorSubmit={() => {}} view={"repo-view"} />
          <Box mb={20} />
          <GetCommentsByIdComponent variables={{ input: { postingId: id } }}>
            {({ data, loading, fetchMore }) => {
              if (loading) {
                <div>Loading...</div>;
              }
              return (
                <>
                  {data && data.findCommentsById && (
                    <>
                      {data.findCommentsById.comments.map(
                        ({ id, createdAt, creator, text }, key: any) => (
                          <React.Fragment key={id}>
                            <Comment
                              id={id}
                              key={key}
                              createdAt={createdAt}
                              creator={creator}
                              body={MarkdownRenderer({ text })}
                              Link={Link}
                            />
                            {data.findCommentsById.hasMore &&
                              key ===
                                data.findCommentsById.comments.length - 4 && (
                                <Waypoint
                                  onEnter={async () =>
                                    await fetchMore({
                                      query: getCommentsByIdQuery,
                                      variables: {
                                        input: {
                                          postingId: id,
                                          cursor:
                                            data.findCommentsById.comments[
                                              data.findCommentsById.comments
                                                .length - 1
                                            ].createdAt
                                        }
                                      },
                                      updateQuery: (
                                        prev: any,
                                        { fetchMoreResult }: any
                                      ) => {
                                        if (!fetchMoreResult) {
                                          return prev;
                                        }
                                        return {
                                          findCommentsById: {
                                            __typename: "FindCommentResponse",
                                            comments: [
                                              ...prev.findCommentsById.comments,
                                              ...fetchMoreResult
                                                .findCommentsById.comments
                                            ],
                                            hasMore:
                                              fetchMoreResult.findCommentsById
                                                .hasMore
                                          }
                                        };
                                      }
                                    })
                                  }
                                />
                              )}
                          </React.Fragment>
                        )
                      )}
                    </>
                  )}
                </>
              );
            }}
          </GetCommentsByIdComponent>
        </PostContext.Provider>
      </Layout>
    );
  }
}
