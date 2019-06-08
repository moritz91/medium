import { distanceInWordsToNow } from "date-fns";
import * as React from "react";
import { Flex, Text, Box } from "rebass";
import { styled, Avatar } from "@medium/ui";
import { UserPopover } from "../../modules/user/shared/userPopover";
import { useHover } from "use-events";
import { ActionsDropdown } from "../../modules/post/shared/actionsDropdown";
import { DeleteComment } from "../../modules/comment/deleteComment";

// body: React.ReactElement<HTMLElement> | null;
interface Props {
  id: string;
  body: any;
  createdAt: string;
  creator: any;
  Link: any;
}

export const CommmentContainer = styled.div`
  width: 100%;
  margin: 1.6rem 0px 1rem 0px;
`;

export const TopRow = styled.div`
  display: grid;
  grid-template-areas: "avatar content actions";
  grid-template-columns: min-content 1fr auto;
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

export const Comment: React.FC<Props> = ({
  id,
  creator: { username, pictureUrl },
  body,
  Link,
  createdAt
}) => {
  const dtString = distanceInWordsToNow(Date.parse(createdAt), {
    addSuffix: true
  });
  const [flyoutOpen, bind] = useHover();

  return (
    <CommmentContainer>
      <TopRow>
        <UserAvatar>
          <UserPopover
            flyoutOpen={flyoutOpen}
            username={username}
            pictureUrl={pictureUrl}
          >
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
          <div style={{ cursor: "pointer" }}>
            <ActionsDropdown>
              <DeleteComment commentId={id} />
            </ActionsDropdown>
          </div>
        </Actions>
      </TopRow>
    </CommmentContainer>
  );
};
