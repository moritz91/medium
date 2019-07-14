import * as React from "react";
import { createRef, useState, useReducer } from "react";
import { Waypoint } from "react-waypoint";
import { Box, Text } from "rebass";
import { useClickOutside } from "use-events";
import { GetCommentsByIdComponent } from "../../components/apollo-components";
import { Comment } from "../../components/comment/";
import {
  CommentTargetContext,
  CommentTargetContextProps
} from "../../components/context/CommentTargetContext";
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
  const ref3 = createRef<HTMLDivElement>();
  const [target, setTarget] = useState<string | undefined>("");

  const [state, dispatch] = useReducer(reducer, {
    elementId: "",
    flyoutState: false,
    popoverState: false,
    ref1: { current: null },
    ref2: { current: null }
  });

  function reducer(state: any, action: any) {
    switch (action.type) {
      case "openFlyout":
        return {
          ...state,
          elementId: action.id,
          ref1: action.ref1,
          ref2: action.ref2,
          flyoutState: true
        };
      case "openPopover":
        return {
          ...state,
          elementId: action.id,
          popoverState: true
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
      default: {
        return state;
      }
    }
  }

  useClickOutside([state.ref1, state.ref2], () => {
    dispatch({
      type: "close"
    });
  });

  // useClickOutside([ref3], () => {
  //   const { pathname, query } = Router;
  //   const formatted = format({ pathname, query });
  //   Router.push(formatted, `${query!.id}`, { shallow: true });
  //   setTarget("");
  // });

  // useEffect(() => {
  //   const { asPath } = Router;
  //   if (includes(asPath, "#")) {
  //     setTarget(asPath);
  //   }
  // }, [target]);

  const PostCtx: PostContextProps = {
    title,
    creator,
    postingId
  };

  const FlyoutCtx: FlyoutContextProps = {
    dispatch,
    state
  };

  const CommentTargetCtx: CommentTargetContextProps = {
    target,
    setTarget,
    ref3
  };

  return (
    // @ts-ignore
    <Layout title={`${title}`}>
      <PostContext.Provider value={PostCtx}>
        <FlyoutContext.Provider value={FlyoutCtx}>
          <CommentTargetContext.Provider value={CommentTargetCtx}>
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
                                    data.findCommentsById.comments.length -
                                      4 && (
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
                                                __typename:
                                                  "FindCommentResponse",
                                                comments: [
                                                  ...prev.findCommentsById
                                                    .comments,
                                                  ...fetchMoreResult
                                                    .findCommentsById.comments
                                                ],
                                                hasMore:
                                                  fetchMoreResult
                                                    .findCommentsById.hasMore
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
          </CommentTargetContext.Provider>
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
