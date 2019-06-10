import { styled, MyButton } from "@medium/ui";
import { Flex, Box, Text } from "rebass";
import { useContext } from "react";
import {
  TopicContext,
  TopicContextProps
} from "../../modules/topic/shared/topicContext";
import { Heading } from "../heading";

export const Sections = styled.section`
  justify-content: space-between;
  display: flex;
  box-sizing: border-box;
  max-width: 1080px;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
`;

export const MainSection = styled.section`
  max-width: 680px;
  box-sizing: border-box;
  width: 100%;
  display: block;
`;

export const SidebarContainer = styled.section`
  max-width: 328px;
  box-sizing: border-box;
  width: 100%;
  display: block;
`;

export const SidebarSection: React.FC = () => {
  const { name, shortCaption } = useContext<TopicContextProps>(TopicContext);
  return (
    <SidebarContainer>
      <Flex justifyContent="center">
        <div
          style={{
            paddingLeft: ".8rem",
            marginRight: "auto"
          }}
        >
          <Box mb={2} mt={0} mr={0} ml={"0rem"}>
            <Text fontWeight="bold" fontSize={6}>
              {name}
            </Text>
            <Text fontSize={4}>{shortCaption}</Text>
          </Box>
          <Box mb={2} mt={0} mr={0} ml={"0rem"}>
            <MyButton variant="tag">Follow</MyButton>
          </Box>
          <Text lineHeight={1.58} mb="1rem" fontSize={4}>
            Follow to get great stories about {name} in your inbox and on your
            homepage
          </Text>
        </div>
        <div>
          <Heading>Related Topics</Heading>
        </div>
        <div>
          <Heading>Popular in {name}</Heading>
        </div>
      </Flex>
    </SidebarContainer>
  );
};
