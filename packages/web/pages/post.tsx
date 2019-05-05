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
import { Text, Box } from "rebass";
import { DeleteComment } from "../modules/post/shared/DeleteComment";
import { ContextProps, PostContext } from "../modules/post/shared/PostContext";
import { DeletePosting } from "../modules/post/DeletePosting";
import { MarkdownRenderer } from "../modules/post/shared/MarkdownEditor/MarkdownRenderer";
import { CreatePostingReply } from "../modules/post/shared/CreateComment";

interface Props {
  id: string;
  creator: UserInfoFragment;
  title: string;
  body: string;
  numComments: number;
  createdAt: string;
}

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
      numComments: getPostingById!.numComments,
      createdAt: getPostingById!.createdAt
    };
  }

  render() {
    const { title, creator, body, id, createdAt, numComments } = this.props;
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
            numComments={numComments}
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
          <Box my="1.5rem">
            <Text fontSize={5} color="primary.6">
              Responses
            </Text>
          </Box>
          <CreatePostingReply onEditorSubmit={() => {}} view={"repo-view"} />
          <GetCommentsByIdComponent variables={{ input: { postingId: id } }}>
            {({ data, loading }) => {
              if (loading) {
                <div>Loading...</div>;
              }
              return (
                <>
                  {data && data.findCommentsById && (
                    <>
                      {data.findCommentsById.comments.map(
                        ({ id, createdAt, creator, text }, key: any) => (
                          <div id={id.slice(0, 6)} key={key}>
                            <Comment
                              createdAt={createdAt}
                              creator={creator}
                              body={MarkdownRenderer({ text })}
                              Link={Link}
                            />
                            <Box mx={3} mt={1}>
                              <DeleteComment commentId={id} />
                            </Box>
                          </div>
                        )
                      )}
                    </>
                  )}
                </>
              );
            }}
          </GetCommentsByIdComponent>
        </PostContext.Provider>
      </Layout>
    );
  }
}
