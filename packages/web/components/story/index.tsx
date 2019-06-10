import { distanceInWordsToNow, format } from "date-fns";
import * as React from "react";
import { Flex, Text, Heading } from "rebass";
import styled from "styled-components";
import { useHover } from "use-events";
import { Avatar, Icon, MyButton } from "@medium/ui";
import { UserPopover } from "../../modules/user/shared/userPopover";
import { StoryFooterUsername } from "../heading";

interface Props {
  id: string;
  previewTitle?: string | null;
  previewSubtitle?: string | null;
  previewImage?: string | null;
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
  padding: 1rem;
  margin: 1.6rem 0px;
`;

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

export const Story: React.FC<Props> = ({
  previewTitle,
  previewSubtitle,
  previewImage,
  title,
  creator: { username, pictureUrl },
  body,
  numComments,
  getLinkProps,
  Link,
  createdAt,
  tags
}) => {
  const linkProps = getLinkProps();

  const dtString = format(Date.parse(createdAt), "MMM D");

  const [popoverState, bind] = useHover();

  return (
    <Container>
      <Flex justifyContent="center">
        <span style={{ minWidth: "45px" }}>
          <Link route={"profile"} params={{ username }}>
            <a style={{ cursor: "pointer" }}>
              <Avatar
                borderRadius={3}
                size={34}
                src={pictureUrl}
                alt="avatar"
              />
            </a>
          </Link>
        </span>
        <div
          style={{
            paddingLeft: ".8rem",
            justifyContent: "center",
            flexDirection: "column",
            marginRight: "auto"
          }}
        >
          <Flex className="posting-header">
            <Link {...linkProps}>
              <a>
                <Heading ml="0rem" mb="1rem" fontSize={5} fontWeight="none">
                  {previewTitle ? previewTitle : title}
                </Heading>
              </a>
            </Link>
            <div style={{ display: "flex", marginLeft: "auto" }}>
              <div style={{ cursor: "pointer" }}>
                <Icon name="showActions" fill="#000" />
              </div>
            </div>
          </Flex>
          <div style={{ fontSize: 12 }}>
            {dtString} •
            {numComments == 1
              ? ` ${numComments}` + " response"
              : ` ${numComments}` + " responses"}
          </div>
          <div style={{ display: "flex", fontSize: "12px" }}>
            <Text lineHeight={1.58} mb="1rem" fontSize={4}>
              {previewSubtitle ? previewSubtitle : body}
            </Text>
          </div>
        </div>
      </Flex>
      {tags.map((t: any, idx: number) => (
        <MyButton variant="tag" key={idx}>
          {t.name}
        </MyButton>
      ))}
      <div style={{ display: "flex", marginLeft: "auto" }}>
        <TopRow>
          <UserAvatar>
            <UserPopover popoverState={popoverState} username={username}>
              <Link route={"profile"} params={{ username }}>
                <a style={{ cursor: "pointer" }}>
                  <Avatar
                    borderRadius={5}
                    size={60}
                    src={pictureUrl}
                    alt="avatar"
                    {...bind}
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
            <p>
              Financial Consultant. Analyst. Writer. Over a decade of experience
              in the financial industry.
            </p>
          </Content>
          <Actions style={{ display: "flex", marginLeft: "auto" }}>
            <MyButton variant="tag">Follow</MyButton>
          </Actions>
        </TopRow>
      </div>
    </Container>
  );
};
