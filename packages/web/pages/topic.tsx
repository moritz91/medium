import { PostRow } from "@medium/ui";
import React from "react";
import { GetPostingsByTopicComponent } from "../components/apollo-components";
import Layout from "../components/layout";
import { MainSection, Sections, SidebarSection } from "../components/section";
import { getTopicByNameQuery } from "../graphql/topic/query/getTopicByName";
import {
  TopicContext,
  TopicContextProps
} from "../modules/topic/shared/topicContext";
import { Link } from "../server/routes";
import { NextContextWithApollo } from "../types/NextContextWithApollo";

interface Props {
  id: string;
  name: string;
  shortCaption: string;
  numPostings: string;
}

export default class Topic extends React.PureComponent<Props> {
  static async getInitialProps({
    query: { name },
    apolloClient
  }: NextContextWithApollo) {
    const response: any = await apolloClient.query({
      query: getTopicByNameQuery,
      variables: {
        name
      }
    });

    const { getTopicByName } = response.data;

    return {
      name,
      id: getTopicByName!.id,
      shortCaption: getTopicByName!.shortCaption,
      numPostings: getTopicByName!.numPostings
    };
  }

  render() {
    const { name, shortCaption, id, numPostings } = this.props;
    const context: TopicContextProps = {
      name,
      shortCaption,
      numPostings,
      topicId: id
    };

    return (
      // @ts-ignore
      <Layout title={`${name}`}>
        <Sections>
          <TopicContext.Provider value={context}>
            <MainSection>
              <GetPostingsByTopicComponent
                variables={{ input: { topicId: id } }}
              >
                {({ data }) => {
                  return (
                    <>
                      {data && data.getPostingsByTopic && (
                        <>
                          {data.getPostingsByTopic.posts.map(post => (
                            <PostRow
                              key={post.id}
                              id={post.id}
                              createdAt={post.createdAt}
                              creator={post.creator}
                              previewTitle={post.previewTitle}
                              previewSubtitle={post.previewSubtitle}
                              previewImage={post.previewImage}
                              title={post.title}
                              body={post.body}
                              numComments={post.numComments}
                              Link={Link}
                              tags={post.tags}
                              getLinkProps={() => ({
                                route: "post",
                                params: {
                                  id: post.id
                                }
                              })}
                            />
                          ))}
                        </>
                      )}
                    </>
                  );
                }}
              </GetPostingsByTopicComponent>
            </MainSection>
            <SidebarSection />
          </TopicContext.Provider>
        </Sections>
      </Layout>
    );
  }
}
