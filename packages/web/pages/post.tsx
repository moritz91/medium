import React from "react";
import { NextContextWithApollo } from "../types/NextContextWithApollo";
import { getPostingByIdQuery } from "../graphql/post/query/getPostingById";
import Layout from "../components/layout";
import { Comment } from "../components/comment";
import {
  UserInfoFragment,
  GetCommentsByIdComponent,
  TagInfoFragment
} from "../components/apollo-components";
import { UserInfoFragment as userInfoFragment } from "../graphql/user/fragments/UserInfo";
import { Link } from "../server/routes";
import { Text, Box } from "rebass";
import { Story } from "@medium/ui";
import {
  PostContextProps,
  PostContext
} from "../modules/post/shared/postContext";
import { DeletePosting } from "../modules/post/deletePosting";
import { MarkdownRenderer } from "../modules/post/shared/markdownEditor/markdownRenderer";
import { CreatePostingReply } from "../modules/comment/createComment";

interface Props {
  id: string;
  creator: UserInfoFragment;
  previewTitle: string;
  previewSubtitle: string;
  caption: string;
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
      caption: getPostingById!.caption,
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
      caption,
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
      creator: userInfoFragment,
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
            caption={caption}
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
          <Box mx={3} mt={1}>
            <DeletePosting />
          </Box>
          <Box my="1.5rem">
            <Text fontSize={5}>Responses</Text>
          </Box>
          <CreatePostingReply onEditorSubmit={() => {}} view={"repo-view"} />
          <GetCommentsByIdComponent variables={{ input: { postingId: id } }}>
            {({ data, loading }) => {
              if (loading) {
                <div>Loading...</div>;
              }
              return (
                <>
                  {data && data.findCommentsById && (
                    <>
                      {data.findCommentsById.comments.map(
                        ({ id, createdAt, creator, text }, key: any) => (
                          <div id={id.slice(0, 6)} key={key}>
                            <Comment
                              id={id}
                              createdAt={createdAt}
                              creator={creator}
                              body={MarkdownRenderer({ text })}
                              Link={Link}
                            />
                            {/* {data.findCommentsById.hasMore &&
                              key ===
                                data.findCommentsById.comments.length - 10 && (
                                <Waypoint
                                  onEnter={() =>
                                    fetchMore({
                                      variables: {
                                        postingId: id,
                                        cursor:
                                          data.findCommentsById.comments[
                                            length - 1
                                          ]
                                      },
                                      updateQuery: (
                                        prev: any,
                                        {
                                          fetchMoreResult
                                        }: { fetchMoreResult: any }
                                      ) => {
                                        if (!fetchMoreResult) return prev;
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
                              )} */}
                          </div>
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
