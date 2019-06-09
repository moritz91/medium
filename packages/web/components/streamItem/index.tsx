import { distanceInWordsToNow } from "date-fns";
import * as React from "react";
import { Flex, Text, Heading, Box } from "rebass";
import styled from "styled-components";
import { Icon, MyButton } from "@medium/ui";

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
  padding: 1rem;
  margin: 1.6rem 0px;
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
  const linkProps = getLinkProps();
  const dtString = distanceInWordsToNow(Date.parse(createdAt), {
    addSuffix: true
  });

  return (
    <StreamItemContainer>
      <Flex justifyContent="center">
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
                <Icon name="showActions" fill="#fff" />
              </div>
            </div>
          </Flex>
          <Text lineHeight={1.58} mb="1rem" fontSize={4}>
            {previewSubtitle ? previewSubtitle : body}
          </Text>
          {previewImage && (
            <Box>
              <img height={"50px"} src={previewImage} />
            </Box>
          )}
          <div style={{ display: "flex", fontSize: "12px" }}>
            <div>
              <Link route={"profile"} params={{ username }}>
                <a>{username}</a>
              </Link>
            </div>
            <div>
              {dtString} •
              {numComments == 1
                ? `${numComments}` + " response"
                : `${numComments}` + " responses"}
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
      </Flex>
    </StreamItemContainer>
  );
};
