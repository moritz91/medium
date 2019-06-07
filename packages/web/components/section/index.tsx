import { styled } from "@medium/ui";
import { Flex, Box, Text } from "rebass";
import { Link } from "../../server/routes";
import { useContext } from "react";
import {
  TopicContext,
  TopicContextProps
} from "../../modules/topic/shared/topicContext";

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
  const { name, description, shortCaption } = useContext<TopicContextProps>(
    TopicContext
  );
  return (
    <SidebarContainer>
      <Flex justifyContent="center">
        <div
          style={{
            paddingLeft: ".8rem",
            marginRight: "auto"
          }}
        >
          <Flex alignItems="baseline">
            <Box mb={2} mt={0} mr={0} ml={"0rem"}>
              <Link route={"topic"} params={{ name }}>
                <a>
                  <Text fontWeight="bold" fontSize={4}>
                    {name}
                  </Text>
                </a>
              </Link>
            </Box>
            <Box mb={2} mt={0} mr={0} ml={"0rem"}>
              <Text>{description}</Text>
            </Box>
          </Flex>
          <Text lineHeight={1.58} mb="1rem" fontSize={4}>
            {shortCaption}
          </Text>
        </div>
      </Flex>
    </SidebarContainer>
  );
};
