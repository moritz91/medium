import { GetPostingsByTopicComponent } from "components/apollo-components";
import { FeaturedStory } from "components/featured";
import Heading, { Caption } from "components/heading";
import { Layout } from "components/layout";
import { MainSection, Sections, SidebarSection } from "components/section";
import { Stream, StreamItem } from "components/stream-item";
import { TopicContext, TopicContextProps } from "context/topic-context";
import { getTopicByNameQuery } from "graphql/topic/query/get-topic-by-name";
import React from "react";
import { Link } from "server/routes";
import { NextContextWithApollo } from "types/next-context-with-apollo";

interface TopicProps {
  id: string;
  name: string;
  shortCaption: string;
  numPostings: string;
}

export default class Topic extends React.PureComponent<TopicProps> {
  static async getInitialProps({ query: { name }, apolloClient }: NextContextWithApollo) {
    const response: any = await apolloClient.query({
      query: getTopicByNameQuery,
      variables: {
        name,
      },
    });

    const { getTopicByName } = response.data;
    return {
      name,
      id: getTopicByName!.id,
      shortCaption: getTopicByName!.shortCaption,
    };
  }

  render() {
    const { name, shortCaption, id } = this.props;
    const context: TopicContextProps = {
      name,
      shortCaption,
      topicId: id,
    };

    return (
      // @ts-ignore
      <Layout title={`${name}`}>
        <Sections>
          <TopicContext.Provider value={context}>
            <MainSection>
              <GetPostingsByTopicComponent variables={{ cursor: "", topicIds: [id] }}>
                {({ data, loading }) => {
                  if (loading) {
                    return null;
                  }
                  if (data && data.getPostingsByTopic.posts[0]) {
                    const featured = data!.getPostingsByTopic.posts[0];
                    return (
                      <>
                        <FeaturedStory
                          id={featured.id}
                          createdAt={featured.createdAt}
                          creator={featured.creator}
                          previewTitle={featured.previewTitle}
                          previewSubtitle={featured.previewSubtitle}
                          previewImage={featured.previewImage}
                          title={featured.title}
                          body={featured.body}
                          numComments={featured.numComments}
                          Link={Link}
                          tags={featured.tags}
                          getLinkProps={() => ({
                            route: "post",
                            params: {
                              id: featured.id,
                            },
                          })}
                        />
                        <Heading>Latest</Heading>
                        <Stream>
                          <>
                            {data && data.getPostingsByTopic && (
                              <>
                                {data.getPostingsByTopic.posts.map((post) => (
                                  <StreamItem
                                    key={post.id}
                                    id={post.id}
                                    createdAt={post.createdAt}
                                    creator={post.creator}
                                    previewTitle={post.previewTitle}
                                    previewSubtitle={post.previewSubtitle}
                                    previewImage={post.previewImage}
                                    title={post.title}
                                    body={post.body}
                                    readingTime={post.readingTime}
                                    isBookmark={post.isBookmark}
                                    numComments={post.numComments}
                                    Link={Link}
                                    tags={post.tags}
                                    getLinkProps={() => ({
                                      route: "post",
                                      params: {
                                        id: post.id,
                                      },
                                    })}
                                  />
                                ))}
                              </>
                            )}
                          </>
                        </Stream>
                      </>
                    );
                  }
                  return <Caption>This topic has no stories yet, be the first to contribute!</Caption>;
                }}
              </GetPostingsByTopicComponent>
            </MainSection>
            <SidebarSection variant="topic" />
          </TopicContext.Provider>
        </Sections>
      </Layout>
    );
  }
}
