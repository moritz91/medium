import { useApolloClient, useMutation } from "@apollo/react-hooks";
import { Maybe, ReplyInfoFragment } from "components/apollo-components";
import { Button } from "components/button";
import { Actions, CommentContainer, Content, TopRow, UserAvatar } from "components/comment/styles";
import { Avatar } from "components/common";
import { Reply } from "components/reply";
import { FlyoutContext, FlyoutContextProps } from "context/flyout-context";
import { PostContext, PostContextProps } from "context/post-context";
import { formatDistanceToNow } from "date-fns";
import gql from "graphql-tag";
import { addReactionMutation } from "graphql/shared/add-reaction";
import { removeReactionMutation } from "graphql/shared/remove-reaction";
import { CopyLink } from "modules/comment/copy-link";
import { CreateResponse } from "modules/comment/create-response";
import { DeleteComment } from "modules/comment/delete-comment";
import { ActionsDropdown } from "modules/post/shared/actions-dropdown";
import { MarkdownRenderer } from "modules/post/shared/markdown-editor/renderer";
import { UserPopover } from "modules/user/shared/user-popover";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Box, Flex, Text } from "rebass";
import { Link } from "server/routes";

interface CommentProps {
  id: string;
  body: any;
  createdAt: string;
  creator: any;
  isAuthor: Maybe<boolean>;
  numReactions: number;
  hasReacted: Maybe<boolean>;
  replies: Maybe<ReplyInfoFragment[]>;
}

const Comment: React.FC<CommentProps> = ({
  id,
  creator: { username, pictureUrl },
  isAuthor,
  body,
  numReactions,
  hasReacted,
  createdAt,
  replies,
}) => {
  const dtString = formatDistanceToNow(Date.parse(createdAt), {
    addSuffix: true,
  });

  const { dispatch, state } = useContext<FlyoutContextProps>(FlyoutContext);
  const { postingId } = useContext<PostContextProps>(PostContext);
  const ref3 = useRef<any>(CommentContainer);

  useEffect(() => {
    if (state.targetId === id) {
      dispatch({ type: "targetComment", id, ref3 });
    }
  }, [state.targetId]);

  const client = useApolloClient();

  const [addReaction] = useMutation(addReactionMutation, {
    variables: { commentId: id },
    onCompleted() {
      setReacted(!reacted);
      client.writeFragment({
        id: `Comment:${id}`,
        fragment: gql`
          fragment numReactions on Comment {
            __typename
            numReactions
          }
        `,
        data: {
          __typename: "Comment",
          numReactions: numReactions + 1,
        },
        variables: { input: { postingId } },
      });
    },
  });
  const [removeReaction] = useMutation(removeReactionMutation, {
    variables: { commentId: id },
    onCompleted() {
      setReacted(!reacted);
      client.writeFragment({
        id: `Comment:${id}`,
        fragment: gql`
          fragment numReactions on Comment {
            __typename
            numReactions
          }
        `,
        data: {
          __typename: "Comment",
          numReactions: numReactions - 1,
        },
        variables: { input: { postingId } },
      });
    },
  });
  const [reacted, setReacted] = useState(hasReacted);
  const [replyInput, setReplyInput] = useState(false);

  return (
    <div>
      <CommentContainer id={id} ref={ref3} targetId={state.targetId} targetState={state.targetState}>
        <TopRow>
          <UserAvatar>
            <UserPopover id={id} username={username}>
              <Link route={"profile"} params={{ username }}>
                <a style={{ cursor: "pointer" }}>
                  <Avatar
                    borderRadius={3}
                    size={34}
                    src={pictureUrl}
                    alt="avatar"
                    onMouseEnter={() => {
                      dispatch({ type: "openPopover", id });
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
            <Flex alignItems="baseline">
              <Box mb={2} mt={0} mr={0} ml={"0rem"}>
                <Link route={"profile"} params={{ username }}>
                  <a>
                    <Text fontWeight="bold" fontSize={4}>
                      {username}
                    </Text>
                  </a>
                </Link>
              </Box>
              <Box mb={2} mt={0} mr={0} ml={"0rem"}>
                <Text>{dtString}</Text>
              </Box>
              <Actions style={{ display: "flex", marginLeft: "auto" }}>
                <div>
                  <ActionsDropdown id={id}>
                    {isAuthor && <DeleteComment commentId={id} />}
                    <CopyLink commentId={id} />
                  </ActionsDropdown>
                </div>
              </Actions>
            </Flex>
            <Text lineHeight={1.58} mb="1rem" fontSize={4}>
              {body}
            </Text>
            <div style={{ display: "flex" }}>
              {reacted ? (
                <Button
                  variant="tag"
                  style={{
                    cursor: "pointer",
                    color: "#5C6AC4",
                    width: "100px",
                  }}
                  onClick={async () => {
                    removeReaction();
                  }}
                >
                  {numReactions == 1 ? `${numReactions}` + " like" : `${numReactions}` + " likes"}
                </Button>
              ) : (
                <Button
                  variant="tag"
                  style={{
                    cursor: "pointer",
                    width: "100px",
                  }}
                  onClick={() => addReaction()}
                >
                  {numReactions == 1 ? `${numReactions}` + " like" : `${numReactions}` + " likes"}
                </Button>
              )}
              <Button
                variant="tag"
                onClick={() => setReplyInput(!replyInput)}
                style={{
                  cursor: "pointer",
                  color: "#5C6AC4",
                  width: "100px",
                  marginLeft: "auto",
                }}
              >
                + Reply
              </Button>
            </div>
          </Content>
        </TopRow>
        {replies?.map(({ id, creator, isAuthor, text, numReactions, createdAt, hasReacted }, key) => (
          <Reply
            id={id}
            key={key}
            creator={creator}
            isAuthor={isAuthor}
            text={MarkdownRenderer({ text })}
            numReactions={numReactions}
            createdAt={createdAt}
            hasReacted={hasReacted}
          />
        ))}
      </CommentContainer>
      {replyInput && (
        <CreateResponse
          onEditorSubmit={() => {
            setReplyInput(false);
          }}
          isReply={true}
          commentId={id}
          postingId=""
        />
      )}
    </div>
  );
};

export default Comment;
