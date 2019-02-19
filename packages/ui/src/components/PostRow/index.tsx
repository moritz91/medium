import { distanceInWordsToNow } from "date-fns";
import * as React from "react";
import { Box, Flex, Text } from "rebass";
import styled from "../../theme/styled-components";
import { Avatar } from "../Avatar";

interface Props {
  id: string;
  title: string;
  createdAt: string;
  creator: any;
  Link: any;
  getLinkProps: () => any;
}

export const PostRowContainer = styled("div")`
  border-width: 0 0 0.1rem 0;
  border-style: solid;
  padding: 1.2rem;
  border-color: #e6eaef;
`;

export const PostRow: React.FC<Props> = ({
  title,
  creator: { username, pictureUrl },
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
        <Avatar size={34} src={pictureUrl} alt="avatar" />
        <div
          style={{
            paddingLeft: ".8rem",
            justifyContent: "center",
            flexDirection: "column",
            marginRight: "auto"
          }}
        >
          <Link {...linkProps}>
            <a>
              <Text fontSize={5} fontFamily="rubik">
                {title}
              </Text>
            </a>
          </Link>
          <Link {...linkProps}>
            <a>
              <Text
                lineHeight="1rem"
                fontFamily="rubik"
                fontSize={3}
                color="neutrals.2"
                mb="1.2rem"
              >
                {username} • {dtString}
              </Text>
            </a>
          </Link>
          <Box mt=".4rem" />
        </div>
      </Flex>
    </PostRowContainer>
  );
};
