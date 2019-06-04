import { distanceInWordsToNow } from "date-fns";
import * as React from "react";
import { Flex, Text, Box } from "rebass";
import { styled, Icon } from "@medium/ui";
import { AvatarPopover } from "../../modules/user/shared/avatarPopover";

// body: React.ReactElement<HTMLElement> | null;
interface Props {
  body: any;
  createdAt: string;
  creator: any;
  Link: any;
}

export const CommmentContainer = styled.div`
  width: 100%;
  padding: 1rem;
  margin: 1.6rem 0px 1rem 0px;
`;

export const Comment: React.FC<Props> = ({
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
        <AvatarPopover username={username} pictureUrl={pictureUrl}>
          Hi!
        </AvatarPopover>
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
            <div style={{ display: "flex", marginLeft: "auto" }}>
              <div style={{ cursor: "pointer" }}>
                <Icon name="showActions" fill="#fff" />
              </div>
            </div>
          </Flex>
          <Text lineHeight={1.58} mb="1rem" fontSize={4}>
            {body}
          </Text>
        </div>
      </Flex>
    </CommmentContainer>
  );
};
