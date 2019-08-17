import { distanceInWordsToNow } from "date-fns";
import * as React from "react";
import { useContext, useRef, useState } from "react";
import { Box, Flex, Text } from "rebass";
import styled, { css } from "styled-components";
import { CopyLink } from "../../modules/comment/copyLink";
import { DeleteComment } from "../../modules/comment/deleteComment";
import { ActionsDropdown } from "../../modules/post/shared/actionsDropdown";
import { UserPopover } from "../../modules/user/shared/userPopover";
import { Avatar } from "../common/Avatar";
import { useEffect } from "react";
import { FlyoutContextProps, FlyoutContext } from "../../context/FlyoutContext";
import { useMutation, useApolloClient } from "@apollo/react-hooks";
import { addReactionMutation } from "../../graphql/shared/addReaction";
import { removeReactionMutation } from "../../graphql/shared/removeReaction";
import { getCommentsByIdQuery } from "../../graphql/comment/query/getCommentsById";
import { PostContext, PostContextProps } from "../../context/PostContext";

interface CommentProps {
  id: string;
  body: any;
  createdAt: string;
  creator: any;
  isAuthor: boolean | null;
  numReactions: number;
  hasReacted: boolean | null;
  Link: any;
}

interface ContainerProps extends React.HTMLProps<HTMLDivElement> {
  targetState: boolean | undefined;
  targetId: string | undefined;
  id: string;
}

export const CommentContainer = styled.div<ContainerProps>`
  width: 100%;
  padding: 11px;
  margin: 1.6rem 0px 1rem 0px;
  border-radius: 3px;

  ${({ targetState, targetId, id }) =>
    targetId === id &&
    targetState &&
    css`
      border-color: #2188ff;
      box-shadow: 0 0px 5px #5c6ac4;
    `}
`;

export const TopRow = styled.div`
  display: grid;
  grid-template-areas: "avatar content";
  grid-template-columns: auto 1fr;
  grid-template-rows: auto;
  gap: 8px 8px;
  flex: 1 1 0%;
`;

export const UserAvatar = styled.div`
  display: grid;
  grid-area: avatar / avatar / avatar / avatar;
`;

export const Actions = styled.div`
  display: grid;
  grid-area: actions / actions / actions / actions;
`;

export const Content = styled.div`
  display: grid;
  grid-area: content / content / content / content;
`;

export const Comment: React.FC<CommentProps> = ({
  id,
  creator: { username, pictureUrl },
  isAuthor,
  body,
  Link,
  numReactions,
  hasReacted,
  createdAt
}) => {
  const dtString = distanceInWordsToNow(Date.parse(createdAt), {
    addSuffix: true
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
      client.writeData({ data: { numReactions: 5 }, id });
    },
    refetchQueries: [
      {
        query: getCommentsByIdQuery,
        variables: { input: { postingId } }
      }
    ]
  });
  const [removeReaction] = useMutation(removeReactionMutation, {
    variables: { commentId: id },
    onCompleted() {
      setReacted(!reacted);
      client.writeData({ data: { numReactions: 4 }, id });
    },
    refetchQueries: [
      {
        query: getCommentsByIdQuery,
        variables: { postingId }
      }
    ]
  });
  const [reacted, setReacted] = useState(hasReacted);

  return (
    <CommentContainer
      id={id}
      ref={ref3}
      targetId={state.targetId}
      targetState={state.targetState}
    >
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
          {reacted ? (
            <Text
              style={{
                cursor: "pointer",
                color: "#5C6AC4"
              }}
              onClick={() => removeReaction()}
              fontSize={2}
            >
              {numReactions == 1
                ? `${numReactions}` + " like"
                : `${numReactions}` + " likes"}
            </Text>
          ) : (
            <Text
              style={{
                cursor: "pointer",
                color: "rgba(0,0,0,0.5)"
              }}
              onClick={() => addReaction()}
              fontSize={2}
            >
              {numReactions == 1
                ? `${numReactions}` + " like"
                : `${numReactions}` + " likes"}
            </Text>
          )}
        </Content>
      </TopRow>
    </CommentContainer>
  );
};
