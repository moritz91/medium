import * as React from "react";
import Layout from "../components/Layout";
import { GetPostingsComponent } from "../components/apollo-components";

interface State {
  limit: number;
  offset: number;
}

export default class Posts extends React.Component<State> {
  state: State = {
    limit: 6,
    offset: 0
  };

  render() {
    return (
      // @ts-ignore
      <Layout title={`Posting List`}>
        <GetPostingsComponent variables={{ input: { ...this.state } }}>
          {({ data }) => {
            return (
              <div>
                {data && data.findPosting && (
                  <>
                    {data.findPosting.posts.map(post => (
                      <div key={post.id}>{post}</div>
                    ))}
                  </>
                )}
              </div>
            );
          }}
        </GetPostingsComponent>
      </Layout>
    );
  }
}
