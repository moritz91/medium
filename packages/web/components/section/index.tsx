import { styled, MyButton } from "@medium/ui";
import { Box, Text } from "rebass";
import { useContext } from "react";
import {
  TopicContext,
  TopicContextProps
} from "../../modules/topic/shared/topicContext";
import { Heading, TopicTitle } from "../heading";

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

interface Props {
  variant: "main" | "topic";
}

export const SidebarSection: React.FC<Props> = props => {
  const { name, shortCaption } = useContext<TopicContextProps>(TopicContext);

  if (props.variant === "topic")
    return (
      <SidebarContainer>
        <div style={{ marginLeft: 56, display: "block" }}>
          <div
            style={{
              display: "block"
            }}
          >
            <Box mb={2} mt={0} mr={0} ml={"0rem"}>
              <TopicTitle>{name}</TopicTitle>
              <Text mt="5px" fontSize={4} color="rgba(0, 0, 0, 0.54)">
                {shortCaption}
              </Text>
            </Box>
            <Box mt={20}>
              <MyButton variant="tag">Follow</MyButton>
            </Box>
          </div>
          <Text
            lineHeight={1.58}
            mt="23px"
            fontSize={4}
            color="rgba(0, 0, 0, 0.54)"
          >
            Follow to get great stories about {name} in your inbox and on your
            homepage
          </Text>
          <div>
            <Heading style={{ marginTop: 48 }}>Related Topics</Heading>
          </div>
          <div>
            <Heading style={{ marginTop: 48 }}>Popular in {name}</Heading>
          </div>
        </div>
      </SidebarContainer>
    );
  return <div>Sidebar variant prop missing.</div>;
};
