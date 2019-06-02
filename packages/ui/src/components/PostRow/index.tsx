import { distanceInWordsToNow } from "date-fns";
import * as React from "react";
import { Flex, Text, Heading } from "rebass";
import styled from "../../theme/styled-components";
import { Avatar } from "../Avatar";
import { Icon } from "../../components/Icon";
import { MyButton } from "../MyButton";

interface Props {
  id: string;
  title: string;
  body: string;
  numComments: number;
  createdAt: string;
  creator: any;
  Link: any;
  tags: any;
  getLinkProps: () => any;
}

export const PostRowContainer = styled.div`
  padding: 1rem;
  margin: 1.6rem 0px;
`;

export const TagRowContainer = styled.div`
  margin: 1.6rem 0px;
`;

export const PostRow: React.FC<Props> = ({
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

  const dtString = distanceInWordsToNow(Date.parse(createdAt), {
    addSuffix: true
  });

  return (
    <PostRowContainer>
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
                  {title}
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
            {body}
          </Text>
          <div style={{ display: "flex", fontSize: "12px" }}>
            <div>
              <Link route={"profile"} params={{ username }}>
                <a>{username}</a>
              </Link>
              in <a>Topic XY</a>
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
    </PostRowContainer>
  );
};
