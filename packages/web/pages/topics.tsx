import React from "react";

import Layout from "../components/Layout";
import { Link } from "../server/routes";
import { GetTopicsComponent } from "../components/apollo-components";
import { TopicTile } from "@medium/ui";

interface Props {
  id: string;
  name: string;
  pictureUrl: string;
}

interface State {
  offset: number;
  limit: number;
}

export default class Topics extends React.PureComponent<Props, State> {
  state: State = {
    offset: 0,
    limit: 6
  };

  render() {
    return (
      // @ts-ignore
      <Layout title={`Topics`}>
        <GetTopicsComponent variables={{ input: { ...this.state } }}>
          {({ data }) => {
            return (
              <>
                {data && data.findTopics && (
                  <>
                    <div style={{ flex: "1 1 auto", display: "flex" }}>
                      {data.findTopics.topics.map(topic => (
                        <TopicTile
                          key={topic.id}
                          id={topic.id}
                          name={topic.name}
                          pictureUrl={topic.pictureUrl}
                          Link={Link}
                          getLinkProps={() => ({
                            route: "topic",
                            params: {
                              name: topic.name
                            }
                          })}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            );
          }}
        </GetTopicsComponent>
      </Layout>
    );
  }
}
