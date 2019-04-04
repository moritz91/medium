import { distanceInWordsToNow } from "date-fns";
import * as React from "react";
import { Flex, Text, Heading } from "rebass";
import styled from "../../theme/styled-components";
import { Avatar } from "../Avatar";
import { Icon } from "../../components/Icon";

const LinkRebass = styled("a")`
  cursor: pointer;
  color: rgb(233, 236, 241);
  &:hover {
    color: #fff;
  }
`;

interface Props {
  id: string;
  title: string;
  body: string;
  numComments: number;
  createdAt: string;
  creator: any;
  Link: any;
  getLinkProps: () => any;
}

export const PostRowContainer = styled.div`
  padding: 1rem;
  box-shadow: 0 0.1rem 0.3rem rgba(0, 0, 0, 0.12),
    0 0.1rem 0.2rem rgba(0, 0, 0, 0.24);
  margin: 1.6rem 0px;
`;

export const PostRow: React.FC<Props> = ({
  title,
  creator: { username, pictureUrl },
  body,
  numComments,
  getLinkProps,
  Link,
  createdAt
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
                <Heading ml="0rem" mb="1rem" fontSize={6}>
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
          <Link route={"profile"} params={{ username }}>
            <LinkRebass>
              {username} • {dtString} •{" "}
              {numComments == 1
                ? `${numComments}` + " response"
                : `${numComments}` + " responses"}
            </LinkRebass>
          </Link>
        </div>
      </Flex>
    </PostRowContainer>
  );
};
