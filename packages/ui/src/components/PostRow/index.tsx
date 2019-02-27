import { distanceInWordsToNow } from "date-fns";
import * as React from "react";
import { Flex, Text, Heading } from "rebass";
import styled from "../../theme/styled-components";
import { Avatar } from "../Avatar";

const LinkRebass = styled("a")`
  cursor: pointer;
  &:hover {
    color: #3290d4;
  }
`;

interface Props {
  id: string;
  title: string;
  body: string;
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
        <Link route={"profile"} params={{ username }}>
          <Avatar borderRadius={3} size={34} src={pictureUrl} alt="avatar" />
        </Link>
        <div
          style={{
            paddingLeft: ".8rem",
            justifyContent: "center",
            flexDirection: "column",
            marginRight: "auto"
          }}
        >
          <Link {...linkProps}>
            <Heading ml="0rem" mb="1rem" fontSize={6}>
              {title}
            </Heading>
          </Link>
          <Text lineHeight={1.58} mb="1rem" fontSize={4}>
            {body}
          </Text>
          <Link route={"profile"} params={{ username }}>
            <LinkRebass>
              {username} • {dtString}
            </LinkRebass>
          </Link>
        </div>
      </Flex>
    </PostRowContainer>
  );
};
