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
                {data && data.findPosting && (
                  <>
                    {data.findPosting.posts.map(post => (
                      <PostRow
                        key={post.id}
                        id={post.id}
                        createdAt={post.createdAt}
                        creator={post.creator}
                        title={post.title}
                        Link={Link}
                        getLinkProps={() => ({
                          route: "post",
                          params: {
                            id: post.id
                          }
                        })}
                      />
                      // <BigCard key={post.id}>
                      //   <Link as={`p/${post.id}`} href={`p/${post.id}`}>
                      //     <Heading mb="1rem" fontSize={6}>
                      //       {post.title}
                      //     </Heading>
                      //   </Link>
                      //   <Text className={"Body"} fontSize={6} mb="1rem">
                      //     {post.body}
                      //   </Text>
                      //   <Image
                      //     src={post.creator.pictureUrl}
                      //     borderRadius={3}
                      //     height="20px"
                      //     width="20px"
                      //   />
                      //   <Text fontSize={4}>
                      //     {post.creator.username} | posted at {post.createdAt}
                      //   </Text>
                      // </BigCard>
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
