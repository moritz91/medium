import * as React from "react";
import { useReducer, useEffect } from "react";
import { Waypoint } from "react-waypoint";
import { Box, Text, Flex } from "rebass";
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
import { getCommentsByIdQuery } from "../../graphql/comment/query/getCommentsById";
import { getPostingByIdQuery } from "../../graphql/post/query/getPostingById";
import { Link } from "../../server/routes";
import { NextContextWithApollo } from "../../types/NextContextWithApollo";
import { CreatePostingReply } from "../comment/createComment";
import { MarkdownRenderer } from "./shared/markdownEditor/markdownRenderer";
import { includes } from "lodash";
import Router from "next/router";
import { format } from "url";
import { format as formatDate } from "date-fns";
import styled from "styled-components";
import { UserPopover } from "../user/shared/userPopover";
import { Avatar } from "../../components/common/Avatar";
import {
  Caption,
  StoryFooterUsername,
  StoryHeading
} from "../../components/heading";
import { Button } from "../../components/button";
import { ActionsDropdown } from "./shared/actionsDropdown";
import { DeletePosting } from "./deletePosting";
import { Icon } from "../../components/icon";

const StoryContainer = styled.div`
  margin: 1.6rem 0px;
`;

export const CommentContainer = styled.div`
  width: 100%;
  margin: 1.6rem 0px 1rem 0px;
`;

export const StoryTags = styled.div``;

export const StoryPerformance = styled.div`
  display: flex;
  align-items: center;
`;

export const StoryMetaOptions = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const UserAvatar = styled.div`
  display: grid;
  grid-area: avatar / avatar / avatar / avatar;
`;

export const Actions = styled.div`
  grid-area: actions / actions / actions / actions;
`;

export const Content = styled.div`
  grid-area: content / content / content / content;
  padding: 0 10px;
`;

export const StoryFooter = styled.div`
  margin: 15px 0 0;
  padding: 15px 0 0;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
`;

export const TopRow = styled.div`
  display: grid;
  grid-template-areas: "avatar content actions";
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto;
  gap: 8px 8px;
  flex: 1 1 0%;
`;

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "openFlyout":
      return {
        ...state,
        flyoutId: action.id,
        flyoutState: true,
        ref1: action.ref1,
        ref2: action.ref2
      };
    case "openPopover":
      return {
        ...state,
        popoverId: action.id,
        popoverState: true
      };
    case "targetComment":
      return {
        ...state,
        targetId: action.id,
        targetState: true,
        ref3: action.ref3
      };
    case "closePopover":
      return {
        ...state,
        popoverId: "",
        popoverState: false
      };
    case "closeFlyout":
      return {
        ...state,
        flyoutId: "",
        flyoutState: false,
        ref1: { current: null },
        ref2: { current: null }
      };
    case "untargetComment":
      return {
        ...state,
        targetId: "",
        targetState: false,
        ref3: { current: null }
      };
    default: {
      return state;
    }
  }
};

export const Posting = ({
  previewTitle,
  previewSubtitle,
  title,
  body,
  creator,
  creator: { username, pictureUrl },
  isAuthor,
  isBookmark,
  postingId,
  createdAt,
  numComments,
  tags
}: any): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, {
    flyoutId: "",
    popoverId: "",
    targetId: "",
    flyoutState: false,
    popoverState: false,
    targetState: false,
    ref1: { current: null },
    ref2: { current: null },
    ref3: { current: null }
  });

  useClickOutside([state.ref1, state.ref2], () => {
    dispatch({
      type: "closeFlyout"
    });
  });

  useClickOutside([state.ref3], () => {
    const { pathname, query } = Router;
    const formatted = format({ pathname, query });
    Router.push(formatted, `${query!.id}`, { shallow: true });
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
  }, [dispatch]);

  const PostCtx: PostContextProps = {
    title,
    creator,
    postingId
  };

  const FlyoutCtx: FlyoutContextProps = {
    dispatch,
    state
  };

  const dtString = formatDate(Date.parse(createdAt), "MMM D");

  return (
    // @ts-ignore
    <Layout title={`${title}`}>
      <PostContext.Provider value={PostCtx}>
        <FlyoutContext.Provider value={FlyoutCtx}>
          <StoryContainer>
            <Flex justifyContent="center">
              <div>
                <Flex className="posting-header">
                  <StoryHeading>
                    {previewTitle ? previewTitle : title}
                  </StoryHeading>
                  {isAuthor && (
                    <div style={{ display: "flex", marginLeft: "auto" }}>
                      <div>
                        <ActionsDropdown id={postingId}>
                          <DeletePosting />
                        </ActionsDropdown>
                      </div>
                    </div>
                  )}
                </Flex>
                <div style={{ fontSize: 14, padding: "8px 0" }}>
                  {dtString} • {username} •
                  {numComments == 1
                    ? ` ${numComments}` + " response"
                    : ` ${numComments}` + " responses"}
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
              width: 728
            }}
          >
            <StoryTags>
              {tags.map((t: any, idx: number) => (
                <Button variant="tag" key={idx}>
                  {t.name}
                </Button>
              ))}
            </StoryTags>
            <StoryMetaOptions>
              <StoryPerformance style={{ fontSize: 14 }}>
                4.6K Likes
              </StoryPerformance>
              <StoryPerformance>
                {isBookmark ? (
                  <Button variant="action" style={{ paddingRight: 8 }}>
                    <Icon name="saveStory" fill="#fff" size={26} />
                  </Button>
                ) : (
                  <Button variant="action" style={{ paddingRight: 8 }}>
                    <Icon name="saveStory" fill="#000" size={26} />
                  </Button>
                )}
                <Button
                  variant="action"
                  hoverEffect
                  style={{ paddingRight: 8 }}
                >
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
                            dispatch({ type: "openPopover", postingId });
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
                    Financial Consultant. Analyst. Writer. Over a decade of
                    experience in the financial industry.
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
            <CreatePostingReply onEditorSubmit={() => {}} view={"repo-view"} />
            <Box mt={20} style={{ display: "flex", flexDirection: "column" }}>
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
                            (
                              { id, createdAt, creator, text, isAuthor },
                              key: any
                            ) => (
                              <React.Fragment key={id}>
                                <Comment
                                  id={id}
                                  key={key}
                                  createdAt={createdAt}
                                  creator={creator}
                                  isAuthor={isAuthor}
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
    title: getPostingById!.title,
    body: getPostingById!.body,
    creator: getPostingById!.creator,
    isAuthor: getPostingById!.isAuthor,
    numComments: getPostingById!.numComments,
    createdAt: getPostingById!.createdAt,
    tags: getPostingById!.tags
  };
};
