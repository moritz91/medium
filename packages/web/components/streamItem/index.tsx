import { format } from "date-fns";
import * as React from "react";
import { Flex } from "rebass";
import styled from "styled-components";
import { StoryPreviewTitle } from "../heading";
import { Button } from "../button";
import { Icon } from "../icon";
import { BookmarkPosting } from "../../modules/post/bookmarkPosting";

interface StreamItemProps {
  id: string;
  previewTitle?: string | null;
  previewSubtitle?: string | null;
  previewImage?: string | null;
  title: string;
  body: string;
  readingTime: number;
  isBookmark: boolean | null;
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

export const StreamItem: React.FC<StreamItemProps> = ({
  id,
  previewTitle,
  previewSubtitle,
  previewImage,
  title,
  body,
  readingTime,
  creator: { username },
  isBookmark,
  numComments,
  getLinkProps,
  Link,
  createdAt,
}) => {
  const linkProps = getLinkProps();
  const dtString = format(Date.parse(createdAt), "MMM dd");

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
            paddingRight: "24px",
          }}
        >
          <div
            style={{ marginRight: 25, display: "block", cursor: "pointer" }}
            className="posting-header"
          >
            <Flex className="posting-header">
              <Link {...linkProps}>
                <a>
                  <StoryPreviewTitle>
                    {previewTitle ? previewTitle : title}
                  </StoryPreviewTitle>
                </a>
              </Link>
            </Flex>
            <Link {...linkProps}>
              <a>
                <div
                  style={{
                    marginTop: 4,
                    fontSize: 14,
                    lineHeight: "20px",
                    color: "rgba(0, 0, 0, 0.54)",
                  }}
                >
                  {previewSubtitle ? previewSubtitle : body}
                </div>
              </a>
            </Link>
          </div>
          <div style={{ display: "block", marginTop: 12, fontSize: 13 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "block",
                  flex: "1 1 auto",
                }}
              >
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <Link route={"profile"} params={{ username }}>
                    <a>{username}</a>
                  </Link>
                </div>
                <span
                  style={{
                    display: "block",
                    color: "rgba(0, 0, 0, 0.54)",
                  }}
                >
                  {dtString} •
                  {numComments == 1
                    ? ` ${numComments}` + " response"
                    : ` ${numComments}` + " responses"}{" "}
                  • {readingTime < 1 ? "1" : Math.round(readingTime)} min read
                </span>
              </div>
              <div style={{ display: "flex", marginLeft: "auto" }}>
                <BookmarkPosting postingId={id} isBookmark={isBookmark} />
                <Button variant="action" hoverEffect>
                  <Icon name="showActions" size={15} />
                </Button>
              </div>
            </div>
          </div>
        </div>
        {previewImage && (
          <div style={{ display: "block", flex: "0 0 auto", width: "152px" }}>
            <Link {...linkProps}>
              <a>
                <img
                  style={{ height: "100%", width: "100%", objectFit: "cover" }}
                  src={previewImage}
                />
              </a>
            </Link>
          </div>
        )}
      </section>
    </StreamItemContainer>
  );
};
