import * as React from "react";
import Layout from "../components/Layout";
import { GetUserPostingsComponent } from "../components/apollo-components";
import { Wrapper, PostRow } from "@medium/ui";
import { Link } from "../server/routes";
// import { Heading, Text, Image } from "rebass";
// import Link from "next/link";

interface State {
  creatorId: string;
}

export default class Profile extends React.Component<State> {
  state: State = {
    creatorId: "b2bf799e-ef67-4cf2-ba47-def05b68a7db"
  };

  render() {
    return (
      // @ts-ignore
      <Layout title={`Postings`}>
        <GetUserPostingsComponent variables={{ input: { ...this.state } }}>
          {({ data }) => {
            return (
              <Wrapper>
                {data && data.findUserPostings && (
                  <>
                    {data.findUserPostings.posts.map(post => (
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
        </GetUserPostingsComponent>
      </Layout>
    );
  }
}
