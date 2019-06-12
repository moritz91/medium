import { styled, MyButton } from "@medium/ui";
import { Box, Text } from "rebass";
import { useContext } from "react";
import {
  TopicContext,
  TopicContextProps
} from "../../modules/topic/shared/topicContext";
import { Heading, TopicTitle, H4 } from "../heading";
import { GetPostingsByTopicComponent } from "../apollo-components";
import { truncate } from "lodash";
import { Link } from "../../server/routes";

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
  const { topicId, name, shortCaption } = useContext<TopicContextProps>(
    TopicContext
  );

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
          <Heading style={{ marginTop: 48 }}>Related Topics</Heading>
          <Box mt={"24px"} fontSize={12}>
            <span style={{ textTransform: "uppercase" }}>
              Software Engineering
            </span>
          </Box>
          <Box mt={"8px"} fontSize={12}>
            <span style={{ textTransform: "uppercase" }}>Programming</span>
          </Box>
          <Box mt={"8px"} fontSize={12}>
            <span style={{ textTransform: "uppercase" }}>
              Artificial Intelligence
            </span>
          </Box>
          <Box mt={"8px"} fontSize={12}>
            <span style={{ textTransform: "uppercase" }}>Blockchain</span>
          </Box>
          <Box mt={"8px"} fontSize={12}>
            <span style={{ textTransform: "uppercase" }}>Cryptocurrency</span>
          </Box>
          <div>
            <Heading style={{ marginTop: 48 }}>Popular in {name}</Heading>
            <GetPostingsByTopicComponent variables={{ input: { topicId } }}>
              {({ data }) => {
                return (
                  <>
                    {data!.getPostingsByTopic.posts.map((p: any, i: number) => (
                      <div style={{ height: "100%" }} key={i}>
                        <article
                          style={{
                            marginBottom: 16,
                            marginTop: 16,
                            display: "flex"
                          }}
                        >
                          <div
                            style={{
                              flex: "1 1 0%",
                              marginRight: 12,
                              flexDirection: "column",
                              display: "flex"
                            }}
                          >
                            <div style={{ flex: "0 0 auto", display: "block" }}>
                              <Link route="post" params={{ id: p.id }}>
                                <a>
                                  <div
                                    style={{
                                      marginBottom: 4,
                                      display: "block"
                                    }}
                                  >
                                    <H4>
                                      {truncate(p.previewTitle, {
                                        length: 80,
                                        separator: " "
                                      })}
                                    </H4>
                                  </div>
                                </a>
                              </Link>
                            </div>
                            <div style={{ display: "block", fontWeight: 400 }}>
                              <span
                                style={{
                                  color: "rgba(0, 0, 0, 0.54)",
                                  letterSpacing: "0px",
                                  fontSize: "12.8px",
                                  lineHeight: "20px",
                                  display: "block",
                                  fontWeight: 400
                                }}
                              >
                                15 min read
                              </span>
                            </div>
                          </div>
                          <div style={{ flex: "0 0 auto", display: "block" }}>
                            <Link route="post" params={{ id: p.id }}>
                              <a>
                                <img
                                  style={{ width: "55px", height: "55px" }}
                                  src={p.previewImage}
                                />
                              </a>
                            </Link>
                          </div>
                        </article>
                      </div>
                    ))}
                  </>
                );
              }}
            </GetPostingsByTopicComponent>
          </div>
        </div>
      </SidebarContainer>
    );
  return <div>Sidebar variant prop missing.</div>;
};
