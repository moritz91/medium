import * as React from "react";
import { PostRow, Comment } from "@medium/ui";

import { NextContextWithApollo } from "../types/NextContextWithApollo";
import { PostContext, ContextProps } from "../components/PostContext";
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
import { CreateComment } from "../modules/shared/Comment/CreateComment";
import { DeleteComment } from "../modules/shared/Comment/DeleteComment";

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
      postId: id
    };
    return (
      // @ts-ignore
      <Layout title={`${title}`}>
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
        <PostContext.Provider value={context} />
        <Container my="1.5rem" justifyContent="space-between">
          <Flex alignItems="center">
            <Text fontSize={5} color="primary.6">
              Responses
            </Text>
          </Flex>
        </Container>
        <CreateComment postingId={id} />
        <GetCommentsByIdComponent variables={{ input: { postingId: id } }}>
          {({ data }) => {
            return (
              <>
                {data && data.findCommentsById && (
                  <>
                    {data.findCommentsById.comments.map(comment => (
                      <Flex key={comment.id}>
                        <Comment
                          id={comment.id}
                          createdAt={comment.createdAt}
                          creator={comment.creator}
                          body={comment.text}
                          Link={Link}
                        />
                        <Box mx={3} mt={4}>
                          <DeleteComment
                            commentId={comment.id}
                            postingId={id}
                          />
                        </Box>
                      </Flex>
                    ))}
                  </>
                )}
              </>
            );
          }}
        </GetCommentsByIdComponent>
      </Layout>
    );
  }
}
