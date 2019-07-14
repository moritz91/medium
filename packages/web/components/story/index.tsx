import { format } from "date-fns";
import * as React from "react";
import { Flex, Text } from "rebass";
import styled from "styled-components";
import { UserPopover } from "../../modules/user/shared/userPopover";
import { StoryFooterUsername, StoryHeading, Caption } from "../heading";
import { ActionsDropdown } from "../../modules/post/shared/actionsDropdown";
import { DeletePosting } from "../../modules/post/deletePosting";
import { Button } from "../button";
import { Avatar } from "../common/Avatar";
import { useContext } from "react";
import { FlyoutContextProps, FlyoutContext } from "../context/FlyoutContext";

interface StoryProps {
  id: string;
  previewTitle?: string | null;
  previewSubtitle?: string | null;
  title: string;
  body: string;
  numComments: number;
  createdAt: string;
  creator: any;
  Link: any;
  tags: any;
  getLinkProps: () => any;
}

const Container = styled.div`
  margin: 1.6rem 0px;
`;

export const CommentContainer = styled.div`
  width: 100%;
  margin: 1.6rem 0px 1rem 0px;
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

export const Story: React.FC<StoryProps> = ({
  id,
  previewTitle,
  previewSubtitle,
  title,
  creator: { username, pictureUrl },
  body,
  numComments,
  Link,
  createdAt,
  tags
}) => {
  const dtString = format(Date.parse(createdAt), "MMM D");
  const { dispatch } = useContext<FlyoutContextProps>(FlyoutContext);

  return (
    <Container>
      <Flex justifyContent="center">
        <div>
          <Flex className="posting-header">
            <StoryHeading>{previewTitle ? previewTitle : title}</StoryHeading>
            <div style={{ display: "flex", marginLeft: "auto" }}>
              <div>
                <ActionsDropdown id={id}>
                  <DeletePosting />
                </ActionsDropdown>
              </div>
            </div>
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
      {tags.map((t: any, idx: number) => (
        <Button variant="tag" key={idx}>
          {t.name}
        </Button>
      ))}
      <StoryFooter>
        <TopRow>
          <UserAvatar>
            <UserPopover id={id} username={username}>
              <Link route={"profile"} params={{ username }}>
                <a style={{ cursor: "pointer" }}>
                  <Avatar
                    borderRadius={5}
                    size={60}
                    src={pictureUrl}
                    alt="avatar"
                    onMouseEnter={() => {
                      dispatch({ type: "openPopover", id });
                    }}
                    onMouseLeave={() => {
                      dispatch({ type: "close" });
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
              Financial Consultant. Analyst. Writer. Over a decade of experience
              in the financial industry.
            </Caption>
          </Content>
          <Actions>
            <Button variant="tag">Follow</Button>
          </Actions>
        </TopRow>
      </StoryFooter>
    </Container>
  );
};
