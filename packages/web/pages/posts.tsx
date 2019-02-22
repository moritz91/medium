import * as React from "react";
import Layout from "../components/Layout";
import { GetPostingsComponent } from "../components/apollo-components";
import { Wrapper, PostRow } from "@medium/ui";
import { Link } from "../server/routes";
// import { Heading, Text, Image } from "rebass";
// import Link from "next/link";

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
      <Layout title={`Postings`}>
        <GetPostingsComponent variables={{ input: { ...this.state } }}>
          {({ data }) => {
            return (
              <Wrapper>
                {data && data.findPostings && (
                  <>
                    {data.findPostings.posts.map(post => (
                      <PostRow
                        key={post.id}
                        id={post.id}
                        createdAt={post.createdAt}
                        creator={post.creator}
                        title={post.title}
                        body={post.body}
                        Link={Link}
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
              </Wrapper>
            );
          }}
        </GetPostingsComponent>
      </Layout>
    );
  }
}
