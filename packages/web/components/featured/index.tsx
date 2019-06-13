import { distanceInWordsToNow } from "date-fns";
import * as React from "react";
import { Text, Heading } from "rebass";
import styled from "styled-components";
import { UserPopover } from "../../modules/user/shared/userPopover";
import { useHover } from "use-events";
import { Button } from "../button";

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

export const FeaturedStoryContainer = styled.div`
  display: block;
  margin-bottom: 40px;
`;

export const FeaturedStory: React.FC<Props> = ({
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
  const dtString = distanceInWordsToNow(Date.parse(createdAt), {
    addSuffix: true
  });

  return (
    <FeaturedStoryContainer>
      <div style={{ height: "100%", width: "100%" }}>
        {previewImage && (
          <span style={{ minWidth: "45px" }}>
            <Link {...linkProps}>
              <a style={{ cursor: "pointer" }}>
                <img
                  src={previewImage}
                  style={{ height: "382px", width: "100%" }}
                  alt="previewImage"
                />
              </a>
            </Link>
          </span>
        )}
        <div style={{ marginTop: "13px", display: "block" }}>
          <Link {...linkProps}>
            <a>
              <Heading
                ml="0rem"
                mb="1rem"
                fontSize={44}
                lineHeight="48px"
                letterSpacing={-1.25}
                fontWeight="600"
              >
                {previewTitle ? previewTitle : title}
              </Heading>
            </a>
          </Link>
        </div>
        <div style={{ cursor: "pointer" }}>
          <Link {...linkProps}>
            <a>
              <Text
                lineHeight={1.58}
                mb="1rem"
                color="rgba(0, 0, 0, 0.54)"
                fontSize={18}
              >
                {previewSubtitle ? previewSubtitle : body}
              </Text>
            </a>
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
                display: "block",
                flex: "1 1 auto"
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
              {tags.map((t: any, idx: number) => (
                <Button variant="tag" key={idx}>
                  {t.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </FeaturedStoryContainer>
  );
};
