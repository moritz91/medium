import * as React from "react";
import { useReducer, useEffect } from "react";
import { Waypoint } from "react-waypoint";
import { Box, Text } from "rebass";
import { useClickOutside } from "use-events";
import { GetCommentsByIdComponent } from "../../components/apollo-components";
import { Comment } from "../../components/comment/";
import {
  FlyoutContext,
  FlyoutContextProps
} from "../../components/context/FlyoutContext";
import {
  PostContext,
  PostContextProps
} from "../../components/context/PostContext";
import { Layout } from "../../components/layout";
import { Story } from "../../components/story";
import { getCommentsByIdQuery } from "../../graphql/comment/query/getCommentsById";
import { getPostingByIdQuery } from "../../graphql/post/query/getPostingById";
import { Link } from "../../server/routes";
import { NextContextWithApollo } from "../../types/NextContextWithApollo";
import { CreatePostingReply } from "../comment/createComment";
import { MarkdownRenderer } from "./shared/markdownEditor/markdownRenderer";
import { includes } from "lodash";
import Router from "next/router";

export const Posting = ({
  previewTitle,
  previewSubtitle,
  title,
  creator,
  body,
  postingId,
  createdAt,
  numComments,
  tags
}: any): JSX.Element => {
  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case "openFlyout":
        return {
          ...state,
          elementId: action.id,
          flyoutState: true,
          ref1: action.ref1,
          ref2: action.ref2
        };
      case "openPopover":
        return {
          ...state,
          elementId: action.id,
          popoverState: true
        };
      case "targetComment":
        return {
          ...state,
          targetId: action.id,
          targetState: true,
          ref3: action.ref3
        };
      case "close":
        return {
          ...state,
          elementId: "",
          flyoutState: false,
          popoverState: false,
          ref1: { current: null },
          ref2: { current: null }
        };
      case "untargetComment":
        return {
          ...state,
          targetState: false,
          ref3: { current: null }
        };
      default: {
        return state;
      }
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    elementId: "",
    targetId: "",
    flyoutState: false,
    popoverState: false,
    targetState: false,
    ref1: { current: null },
    ref2: { current: null },
    ref3: { current: null }
  });

  console.log("Posting: ", state);

  useClickOutside([state.ref1, state.ref2], () => {
    dispatch({
      type: "close"
    });
  });

  useClickOutside([state.ref3], () => {
    dispatch({
      type: "untargetComment"
    });
  });

  useEffect(() => {
    const asPath = Router.asPath;
    if (includes(asPath, "#")) {
      dispatch({
        type: "targetComment",
        id: asPath!.split("#").pop()
      });
    }
  }, []);

  const PostCtx: PostContextProps = {
    title,
    creator,
    postingId
  };

  const FlyoutCtx: FlyoutContextProps = {
    dispatch,
    state
  };

  return (
    // @ts-ignore
    <Layout title={`${title}`}>
      <PostContext.Provider value={PostCtx}>
        <FlyoutContext.Provider value={FlyoutCtx}>
          <Story
            key={postingId}
            id={postingId}
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
                id: postingId
              }
            })}
          />
          <Box my="1.5rem">
            <Text fontSize={5}>Responses</Text>
          </Box>
          <CreatePostingReply onEditorSubmit={() => {}} view={"repo-view"} />
          <Box mt={20}>
            <GetCommentsByIdComponent variables={{ input: { postingId } }}>
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
                                            postingId,
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
                                                ...prev.findCommentsById
                                                  .comments,
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
          </Box>
        </FlyoutContext.Provider>
      </PostContext.Provider>
    </Layout>
  );
};

Posting.getInitialProps = async ({
  query: { id },
  apolloClient
}: NextContextWithApollo) => {
  const response: any = await apolloClient.query({
    query: getPostingByIdQuery,
    variables: {
      id
    }
  });

  const { getPostingById } = response.data;
  return {
    postingId: id,
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
};
