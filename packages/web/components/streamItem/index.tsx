import { format } from "date-fns";
import * as React from "react";
import { Flex } from "rebass";
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

export const Stream = styled.div`
  padding-top: 12px;
  padding-bottom: 12px;
`;

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
  createdAt
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
            style={{ marginRight: 25, display: "block", cursor: "pointer" }}
            className="posting-header"
          >
            <Flex className="posting-header">
              <Link {...linkProps}>
                <a>
                  <StoryTitle>{previewTitle ? previewTitle : title}</StoryTitle>
                </a>
              </Link>
            </Flex>
            <Link {...linkProps}>
              <div
                style={{
                  marginTop: 4,
                  fontSize: 14,
                  color: "rgba(0, 0, 0, 0.54)"
                }}
              >
                {previewSubtitle ? previewSubtitle : body}
              </div>
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
                    display: "block",
                    color: "rgba(0, 0, 0, 0.54)"
                  }}
                >
                  {dtString} •
                  {numComments == 1
                    ? ` ${numComments}` + " response"
                    : ` ${numComments}` + " responses"}
                </span>
              </div>
              <div style={{ display: "flex", marginLeft: "auto" }}>
                <MyButton variant="action">
                  <Icon name="saveStory" fill="#000" size={25} />
                </MyButton>
                <MyButton variant="action">
                  <Icon name="showActions" fill="#000" size={15} />
                </MyButton>
              </div>
            </div>
          </div>
        </div>
        {previewImage && (
          <div style={{ display: "block", flex: "0 0 auto", width: "152px" }}>
            <Link {...linkProps}>
              <a>
                <img height="100%" width="100%" src={previewImage} />
              </a>
            </Link>
          </div>
        )}
      </section>
    </StreamItemContainer>
  );
};
