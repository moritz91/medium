import React from "react";
import { PostRow } from "@medium/ui";

import { NextContextWithApollo } from "../types/NextContextWithApollo";
import Layout from "../components/layout";
import { GetPostingsByTopicComponent } from "../components/apollo-components";
import { getTopicByNameQuery } from "../graphql/topic/query/getTopicByName";
import {
  ContextProps,
  TopicContext
} from "../modules/topic/shared/topicContext";
import { Link } from "../server/routes";

interface Props {
  id: string;
  name: string;
  description: string;
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
      description: getTopicByName!.description,
      numPostings: getTopicByName!.numPostings
    };
  }

  render() {
    const { name, description, id, numPostings } = this.props;
    const context: ContextProps = {
      name,
      description,
      numPostings,
      topicId: id
    };

    return (
      // @ts-ignore
      <Layout title={`${name}`}>
        <TopicContext.Provider value={context}>
          <GetPostingsByTopicComponent variables={{ input: { topicId: id } }}>
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
        </TopicContext.Provider>
      </Layout>
    );
  }
}
