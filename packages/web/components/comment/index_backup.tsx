import { distanceInWordsToNow } from "date-fns";
import * as React from "react";
import { Flex, Text, Box } from "rebass";
import { UserPopover } from "../../modules/user/shared/userPopover";
import { useHover, useClickOutside } from "use-events";
import { ActionsDropdown } from "../../modules/post/shared/actionsDropdown";
import { DeleteComment } from "../../modules/comment/deleteComment";
import { useState, createRef } from "react";
import styled, { css } from "styled-components";
import { Avatar } from "../common/Avatar";
import { CopyLink } from "../../modules/comment/copyLink";
import { format } from "url";
import Router from "next/router";
import { useEffect } from "react";
import { includes } from "lodash";

interface CommentProps {
  id: string;
  body: any;
  createdAt: string;
  creator: any;
  Link: any;
}

interface ContainerProps extends React.HTMLProps<HTMLDivElement> {
  currentTarget: string | undefined;
  id: string;
}

export const CommmentContainer = styled.div<ContainerProps>`
  width: 100%;
  padding: 10px;
  margin: 1.6rem 0px 1rem 0px;
  border-radius: 3px;
  box-shadow: 0 0px 5px rgba(0, 0, 0, 0.1);

  ${({ currentTarget, id }) =>
    includes(currentTarget, id) &&
    css`
      border-color: #2188ff;
      box-shadow: 0 0px 5px #c8e1ff;
    `}
`;

export const TopRow = styled.div`
  display: grid;
  grid-template-areas: "avatar content actions";
  grid-template-columns: auto 1fr auto;
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
  body,
  Link,
  createdAt
}) => {
  const dtString = distanceInWordsToNow(Date.parse(createdAt), {
    addSuffix: true
  });
  const [popoverState, bind] = useHover();
  const [flyoutState, setFlyoutState] = useState(false);
  const [target, setTarget] = useState<string | undefined>("");

  const ref1 = createRef<HTMLDivElement>();
  const ref2 = createRef<HTMLDivElement>();
  const ref3 = createRef<HTMLDivElement>();

  useClickOutside([ref1, ref2], () => setFlyoutState(false));
  useClickOutside([ref3], () => {
    const { pathname, query } = Router;
    const formatted = format({ pathname, query });
    Router.push(formatted, `${query!.id}`, { shallow: true });
    setTarget("");
  });

  useEffect(() => {
    const { asPath } = Router;
    if (includes(asPath, "#")) {
      setTarget(asPath);
    }
  }, [target]);

  return (
    <CommmentContainer id={id} ref={ref3} currentTarget={target}>
      <TopRow>
        <UserAvatar>
          <UserPopover popoverState={popoverState} username={username}>
            <Link route={"profile"} params={{ username }}>
              <a style={{ cursor: "pointer" }}>
                <Avatar
                  borderRadius={3}
                  size={34}
                  src={pictureUrl}
                  alt="avatar"
                  {...bind}
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
          </Flex>
          <Text lineHeight={1.58} mb="1rem" fontSize={4}>
            {body}
          </Text>
        </Content>
        <Actions style={{ display: "flex", marginLeft: "auto" }}>
          <div>
            <ActionsDropdown
              flyoutState={flyoutState}
              onClick={() => setFlyoutState(!flyoutState)}
              ref1={ref1}
              ref2={ref2}
            >
              <DeleteComment
                onClick={() => setFlyoutState(false)}
                commentId={id}
              />
              <CopyLink onClick={() => setFlyoutState(false)} commentId={id} />
            </ActionsDropdown>
          </div>
        </Actions>
      </TopRow>
    </CommmentContainer>
  );
};
