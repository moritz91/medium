import { useMutation } from "@apollo/react-hooks";
import { ApolloQueryResult } from "apollo-client/core/types";
import { GetCommentsByIdComponent, GetPostingByIdQuery, PostingInfoFragment } from "components/apollo-components";
import { Button } from "components/button";
import Comment from "components/comment";
import { Actions, Content, TopRow, UserAvatar } from "components/comment/styles";
import { Avatar } from "components/common";
import { Caption, StoryFooterUsername, StoryHeading } from "components/heading";
import { Icon } from "components/icon";
import { Layout } from "components/layout";
import { StoryContainer, StoryFooter, StoryMetaOptions, StoryPerformance, StoryTags } from "components/story";
import { FlyoutContext, FlyoutContextProps } from "context/flyout-context";
import { PostContext, PostContextProps } from "context/post-context";
import { format as formatDate } from "date-fns";
import { getCommentsByIdQuery } from "graphql/comment/query/get-comments-by-id";
import { getPostingByIdQuery } from "graphql/post/query/get-posting-by-id";
import { addReactionMutation } from "graphql/shared/add-reaction";
import { removeReactionMutation } from "graphql/shared/remove-reaction";
import redirect from "lib/redirect";
import { includes } from "lodash";
import { CreateResponse } from "modules/comment/create-response";
import { BookmarkPosting } from "modules/post/bookmark-posting";
import { DeletePosting } from "modules/post/delete-posting";
import { ActionsDropdown } from "modules/post/shared/actions-dropdown";
import { MarkdownRenderer } from "modules/post/shared/markdown-editor/renderer";
import { UserPopover } from "modules/user/shared/user-popover";
import Router from "next/router";
import React, { useEffect, useReducer, useState } from "react";
import { Waypoint } from "react-waypoint";
import { Box, Flex, Text } from "rebass";
import { postingReducer } from "reducers/posting-reducer";
import { Link } from "server/routes";
import { NextContextWithApollo } from "types/next-context-with-apollo";
import { format } from "url";
import { useClickOutside } from "use-events";

export const Posting = ({
  previewTitle,
  previewSubtitle,
  title,
  body,
  readingTime,
  allowResponses,
  creator,
  creator: { username, pictureUrl },
  isAuthor,
  isBookmark,
  hasReacted,
  postingId,
  createdAt,
  numComments,
  numReactions,
  tags,
}: { postingId: string } & PostingInfoFragment): JSX.Element => {
  const [state, dispatch] = useReducer(postingReducer, {
    flyoutId: "",
    popoverId: "",
    targetId: "",
    flyoutState: false,
    popoverState: false,
    targetState: false,
    ref1: { current: null },
    ref2: { current: null },
    ref3: { current: null },
  });

  useClickOutside([state.ref1, state.ref2], () => {
    dispatch({
      type: "closeFlyout",
    });
  });

  useClickOutside([state.ref3], () => {
    const { pathname, query } = Router;
    const formatted = format({ pathname, query });
    Router.push(formatted, `${query!.id}`, { shallow: true });
    dispatch({
      type: "untargetComment",
    });
  });

  useEffect(() => {
    const asPath = Router.asPath;
    if (includes(asPath, "#")) {
      dispatch({
        type: "targetComment",
        id: asPath!.split("#").pop(),
      });
    }
  }, [dispatch]);

  const PostCtx: PostContextProps = {
    title,
    creator,
    postingId,
  };

  const FlyoutCtx: FlyoutContextProps = {
    dispatch,
    state,
  };

  const [addReaction] = useMutation(addReactionMutation, {
    variables: { postingId },
    onCompleted() {
      setReacted(!reacted);
    },
    refetchQueries: [
      {
        query: getPostingByIdQuery,
        variables: { id: postingId },
      },
    ],
  });
  const [removeReaction] = useMutation(removeReactionMutation, {
    variables: { postingId },
    onCompleted() {
      setReacted(!reacted);
    },
    refetchQueries: [
      {
        query: getPostingByIdQuery,
        variables: { id: postingId },
      },
    ],
    awaitRefetchQueries: true,
  });
  const dtString = formatDate(Date.parse(createdAt), "MMM d");
  const [reacted, setReacted] = useState(hasReacted);

  return (
    // @ts-ignore
    <Layout title={`${title}`}>
      <PostContext.Provider value={PostCtx}>
        <FlyoutContext.Provider value={FlyoutCtx}>
          <StoryContainer>
            <Flex justifyContent="center">
              <div>
                <Flex className="posting-header">
                  <StoryHeading>{previewTitle ? previewTitle : title}</StoryHeading>
                  {isAuthor && (
                    <div
                      style={{
                        display: "flex",
                        marginLeft: "auto",
                      }}
                    >
                      <div>
                        <ActionsDropdown id={postingId}>
                          <Button
                            variant="action"
                            style={{ display: "flex" }}
                            key={postingId}
                            onClick={() => Router.push(`/p?id=${postingId}/edit`, `/p/${postingId}/edit`)}
                          >
                            <Icon size={16} fill="#5C6AC4" name={"x"} />
                            <Text ml={2}>Edit Posting</Text>
                          </Button>
                          <DeletePosting />
                        </ActionsDropdown>
                      </div>
                    </div>
                  )}
                </Flex>
                <div style={{ fontSize: 14, padding: "8px 0" }}>
                  {dtString} • {username} •
                  {numComments == 1 ? ` ${numComments}` + " response" : ` ${numComments}` + " responses"} •{" "}
                  {readingTime < 1 ? "1" : Math.round(readingTime)} min read
                </div>
                <Text lineHeight={1.58} mb="2rem" fontSize={16}>
                  {previewSubtitle ? previewSubtitle : body}
                </Text>
              </div>
            </Flex>
          </StoryContainer>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              alignSelf: "center",
              width: 728,
            }}
          >
            <StoryTags>
              {tags?.map((t: any, idx: number) => (
                <Button variant="tag" key={idx}>
                  {t.name}
                </Button>
              ))}
            </StoryTags>
            <StoryMetaOptions>
              <StoryPerformance style={{ fontSize: 14 }}>
                {reacted ? (
                  <Button
                    variant="tag"
                    style={{
                      cursor: "pointer",
                      color: "#5C6AC4",
                      width: "100px",
                    }}
                    onClick={() => removeReaction()}
                  >
                    {numReactions == 1 ? `${numReactions}` + " like" : `${numReactions}` + " likes"}
                  </Button>
                ) : (
                  <Button
                    variant="tag"
                    style={{
                      cursor: "pointer",
                      color: "rgba(0,0,0,0.5)",
                      width: "100px",
                    }}
                    onClick={() => addReaction()}
                  >
                    {numReactions == 1 ? `${numReactions}` + " like" : `${numReactions}` + " likes"}
                  </Button>
                )}
              </StoryPerformance>
              <StoryPerformance>
                <BookmarkPosting postingId={postingId} isBookmark={isBookmark} />
                <Button variant="action" hoverEffect style={{ paddingRight: 8 }}>
                  <Icon name="showActions" fill="#000" />
                </Button>
              </StoryPerformance>
            </StoryMetaOptions>
            <StoryFooter>
              <TopRow>
                <UserAvatar>
                  <UserPopover id={postingId} username={username}>
                    <Link route={"profile"} params={{ username }}>
                      <a style={{ cursor: "pointer" }}>
                        <Avatar
                          borderRadius={5}
                          size={60}
                          src={pictureUrl}
                          alt="avatar"
                          onMouseEnter={() => {
                            dispatch({
                              type: "openPopover",
                              postingId,
                            });
                          }}
                          onMouseLeave={() => {
                            dispatch({ type: "closePopover" });
                          }}
                        />
                      </a>
                    </Link>
                  </UserPopover>
                </UserAvatar>
                <Content>
                  <StoryFooterUsername>
                    <Link route={"profile"} params={{ username }}>
                      <a>{username}</a>
                    </Link>
                  </StoryFooterUsername>
                  <Caption>
                    Financial Consultant. Analyst. Writer. Over a decade of experience in the financial industry.
                  </Caption>
                </Content>
                <Actions>
                  <Button variant="tag">Follow</Button>
                </Actions>
              </TopRow>
            </StoryFooter>
            <Box my="1.5rem">
              <Text fontSize={5}>Responses</Text>
            </Box>
            {allowResponses ? (
              <div>
                <CreateResponse onEditorSubmit={() => {}} postingId={postingId} commentId="" isReply={false} />
                <Box
                  mt={20}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <GetCommentsByIdComponent variables={{ input: { postingId } }}>
                    {({ data, loading, fetchMore }) => {
                      if (loading) {
                        <div>Loading...</div>;
                      }
                      return (
                        <>
                          {data?.findCommentsById && (
                            <>
                              {data.findCommentsById.comments.map(
                                (
                                  { id, createdAt, creator, text, isAuthor, numReactions, hasReacted, replies },
                                  key: any,
                                ) => (
                                  <React.Fragment key={id}>
                                    <Comment
                                      id={id}
                                      key={key}
                                      createdAt={createdAt}
                                      creator={creator}
                                      hasReacted={hasReacted}
                                      isAuthor={isAuthor}
                                      numReactions={numReactions}
                                      body={MarkdownRenderer({ text })}
                                      replies={replies}
                                    />
                                    {data.findCommentsById.hasMore &&
                                      key === data.findCommentsById.comments.length - 4 && (
                                        <Waypoint
                                          onEnter={async () =>
                                            await fetchMore({
                                              query: getCommentsByIdQuery,
                                              variables: {
                                                input: {
                                                  postingId,
                                                  cursor:
                                                    data.findCommentsById.comments[
                                                      data.findCommentsById.comments.length - 1
                                                    ].createdAt,
                                                },
                                              },
                                              updateQuery: (prev: any, { fetchMoreResult }: any) => {
                                                if (!fetchMoreResult) {
                                                  return prev;
                                                }
                                                return {
                                                  findCommentsById: {
                                                    __typename: "FindCommentResponse",
                                                    comments: [
                                                      ...prev.findCommentsById.comments,
                                                      ...fetchMoreResult.findCommentsById.comments,
                                                    ],
                                                    hasMore: fetchMoreResult.findCommentsById.hasMore,
                                                  },
                                                };
                                              },
                                            })
                                          }
                                        />
                                      )}
                                  </React.Fragment>
                                ),
                              )}
                            </>
                          )}
                        </>
                      );
                    }}
                  </GetCommentsByIdComponent>
                </Box>
              </div>
            ) : (
              <Caption>Responding to this post has been disabled by the author.</Caption>
            )}
          </Box>
        </FlyoutContext.Provider>
      </PostContext.Provider>
    </Layout>
  );
};

Posting.getInitialProps = async ({ query: { id }, apolloClient, ...ctx }: NextContextWithApollo) => {
  const response: ApolloQueryResult<GetPostingByIdQuery> = await apolloClient.query({
    query: getPostingByIdQuery,
    variables: {
      id,
    },
  });

  const { getPostingById } = response?.data;

  if (!getPostingById) {
    redirect(ctx, "/posts");
    return {};
  }

  return {
    postingId: id,
    previewTitle: getPostingById!.previewTitle,
    previewSubtitle: getPostingById!.previewSubtitle,
    previewImage: getPostingById!.previewImage,
    title: getPostingById!.title,
    body: getPostingById!.body,
    readingTime: getPostingById!.readingTime,
    allowResponses: getPostingById!.allowResponses,
    creator: getPostingById!.creator,
    isAuthor: getPostingById!.isAuthor,
    isBookmark: getPostingById!.isBookmark,
    hasReacted: getPostingById!.hasReacted,
    numReactions: getPostingById!.numReactions,
    numComments: getPostingById!.numComments,
    createdAt: getPostingById!.createdAt,
    tags: getPostingById!.tags,
  };
};
