import { distanceInWordsToNow } from "date-fns";
import * as React from "react";
import { Flex, Text, Box } from "rebass";
import styled from "../../theme/styled-components";
import { Avatar } from "../Avatar";

interface Props {
  id: string;
  body: string;
  createdAt: string;
  creator: any;
  Link: any;
}

export const CommmentContainer = styled.div`
  width: 100%;
  padding: 1rem;
  box-shadow: 0 0.1rem 0.3rem rgba(0, 0, 0, 0.12),
    0 0.1rem 0.2rem rgba(0, 0, 0, 0.24);
  margin: 1.6rem 0px;
`;

export const Comment: React.FC<Props> = ({
  id,
  creator: { username, pictureUrl },
  body,
  Link,
  createdAt
}) => {
  const dtString = distanceInWordsToNow(Date.parse(createdAt), {
    addSuffix: true
  });

  return (
    <CommmentContainer>
      <Flex justifyContent="center">
        <Link route={"profile"} params={{ username }}>
          <Avatar borderRadius={3} size={34} src={pictureUrl} alt="avatar" />
        </Link>
        <div
          style={{
            paddingLeft: ".8rem",
            marginRight: "auto"
          }}
        >
          <Flex alignItems="baseline">
            <Box mb={2} mt={0} mr={0} ml={"0rem"}>
              <Link route={"profile"} params={{ username }}>
                <a>
                  <Text fontWeight="bold" fontSize={4}>
                    {username}
                  </Text>
                </a>
              </Link>
            </Box>
            <Box mb={2} mt={0} mr={0} ml={"0rem"}>
              <Text>{dtString}</Text>
            </Box>
          </Flex>
          <Text lineHeight={1.58} mb="1rem" fontSize={4}>
            {body}
          </Text>
        </div>
      </Flex>
    </CommmentContainer>
  );
};
