import React from "react";
import { PostRow, Comment } from "@medium/ui";

import { NextContextWithApollo } from "../types/NextContextWithApollo";
import { getPostingByIdQuery } from "../graphql/post/query/getPostingById";
import Layout from "../components/Layout";
import {
  UserInfoFragment,
  GetCommentsByIdComponent
} from "../components/apollo-components";
import { UserInfoFragment as userInfoFragment } from "../graphql/user/fragments/UserInfo";
import { Link } from "../server/routes";
import styled from "styled-components";
import { Flex, Text, Box } from "rebass";
import { CreateComment } from "../modules/post/shared/CreateComment";
import { DeleteComment } from "../modules/post/shared/DeleteComment";
import { ContextProps, PostContext } from "../modules/post/shared/PostContext";
import { DeletePosting } from "../modules/post/DeletePosting";
// import { PopoverImage } from "../modules/user/shared/Popover";

interface Props {
  id: string;
  creator: UserInfoFragment;
  title: string;
  body: string;
  createdAt: string;
}

const Container = styled(Flex)`
  flex: 0 0 auto;
`;

export default class Post extends React.PureComponent<Props> {
  static async getInitialProps({
    query: { id },
    apolloClient
  }: NextContextWithApollo) {
    const response: any = await apolloClient.query({
      query: getPostingByIdQuery,
      variables: {
        id
      }
    });

    const { getPostingById } = response.data;

    return {
      id,
      creator: getPostingById!.creator,
      title: getPostingById!.title,
      body: getPostingById!.body,
      createdAt: getPostingById!.createdAt
    };
  }

  render() {
    const { title, creator, body, id, createdAt } = this.props;
    const context: ContextProps = {
      title,
      creator: userInfoFragment,
      postingId: id
    };

    return (
      // @ts-ignore
      <Layout title={`${title}`}>
        <PostContext.Provider value={context}>
          <PostRow
            key={id}
            id={id}
            createdAt={createdAt}
            creator={creator}
            title={title}
            body={body}
            Link={Link}
            getLinkProps={() => ({
              route: "post",
              params: {
                id: id
              }
            })}
          />
          <Box mx={3} mt={1}>
            <DeletePosting />
          </Box>
          <Container my="1.5rem" justifyContent="space-between">
            <Flex alignItems="center">
              <Text fontSize={5} color="primary.6">
                Responses
              </Text>
            </Flex>
          </Container>
          <CreateComment />
          <GetCommentsByIdComponent variables={{ input: { postingId: id } }}>
            {({ data }) => {
              return (
                <>
                  {data && data.findCommentsById && (
                    <>
                      {data.findCommentsById.comments.map(comment => (
                        <Box key={comment.id}>
                          <Comment
                            createdAt={comment.createdAt}
                            creator={comment.creator}
                            body={comment.text}
                            Link={Link}
                          />
                          <Box mx={3} mt={1}>
                            <DeleteComment commentId={comment.id} />
                          </Box>
                        </Box>
                      ))}
                    </>
                  )}
                </>
              );
            }}
          </GetCommentsByIdComponent>
          {/* <PopoverImage /> */}
        </PostContext.Provider>
      </Layout>
    );
  }
}
