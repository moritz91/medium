import { format } from "date-fns";
import * as React from "react";
import { Flex, Text } from "rebass";
import styled from "styled-components";
import { Icon, MyButton } from "@medium/ui";
import { StoryTitle } from "../heading";
import { useHover } from "use-events";
import { UserPopover } from "../../modules/user/shared/userPopover";

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

export const StreamItemContainer = styled.div`
  display: block;
`;

export const TagRowContainer = styled.div`
  margin: 1.6rem 0px;
`;

export const StreamItem: React.FC<Props> = ({
  previewTitle,
  previewSubtitle,
  previewImage,
  title,
  creator: { username },
  body,
  numComments,
  getLinkProps,
  Link,
  createdAt,
  tags
}) => {
  const [popoverState, bind] = useHover();
  const linkProps = getLinkProps();
  const dtString = format(Date.parse(createdAt), "MMM D");
  return (
    <StreamItemContainer>
      <section style={{ paddingTop: 12, paddingBottom: 12, display: "flex" }}>
        <div
          style={{
            flex: "1 1 auto",
            flexDirection: "column",
            marginRight: "0px",
            justifyContent: "space-between",
            display: "flex",
            paddingRight: "24px"
          }}
        >
          <div
            style={{ marginRight: 25, display: "block" }}
            className="posting-header"
          >
            <Flex className="posting-header">
              <Link {...linkProps}>
                <a>
                  <StoryTitle>{previewTitle ? previewTitle : title}</StoryTitle>
                </a>
              </Link>
              <div style={{ display: "flex", marginLeft: "auto" }}>
                <MyButton variant="action">
                  <Icon name="showActions" fill="#000" />
                </MyButton>
              </div>
            </Flex>
            <Link {...linkProps}>
              <Text lineHeight={1.58} mb="1rem" fontSize={4}>
                {previewSubtitle ? previewSubtitle : body}
              </Text>
            </Link>
          </div>
          <div style={{ display: "block", marginTop: 12, fontSize: 13 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%"
              }}
            >
              <div
                style={{
                  display: "block"
                }}
              >
                <div
                  style={{
                    display: "flex"
                  }}
                >
                  <UserPopover popoverState={popoverState} username={username}>
                    <Link route={"profile"} params={{ username }}>
                      <a {...bind}>{username}</a>
                    </Link>
                  </UserPopover>
                </div>
                <span
                  style={{
                    display: "block"
                  }}
                >
                  {dtString} •
                  {numComments == 1
                    ? ` ${numComments}` + " response"
                    : ` ${numComments}` + " responses"}
                </span>
              </div>
              <div style={{ display: "flex", marginLeft: "auto" }}>
                {tags.map((t: any, idx: number) => (
                  <MyButton variant="tag" key={idx}>
                    {t.name}
                  </MyButton>
                ))}
              </div>
            </div>
          </div>
        </div>
        {previewImage && (
          <div style={{ display: "block" }}>
            <Link {...linkProps}>
              <a>
                <img width="152px" src={previewImage} />
              </a>
            </Link>
          </div>
        )}
      </section>
    </StreamItemContainer>
  );
};
