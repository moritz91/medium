import React, { useContext } from "react";
import {
  MeComponent,
  DeleteCommentComponent,
  GetCommentsByIdQuery,
  GetCommentsByIdVariables
} from "../../components/apollo-components";
import { getCommentsByIdQuery } from "../../graphql/comment/query/getCommentsById";
import { get } from "lodash";
import { PostContext } from "../../components/context/PostContext";
import { Button } from "../../components/button";
import { Icon } from "../../components/icon";
import { Text } from "rebass";
import {
  FlyoutContextProps,
  FlyoutContext
} from "../../components/context/FlyoutContext";

interface Props {
  commentId: string;
}

export const DeleteComment = ({ commentId }: Props) => {
  const { postingId } = useContext(PostContext);
  const { dispatch } = useContext<FlyoutContextProps>(FlyoutContext);

  return (
    <DeleteCommentComponent>
      {mutate => (
        <>
          <MeComponent variables={{ withBookmarks: false }}>
            {({ data, loading }) => {
              if (loading) {
                return null;
              }

              let isLoggedIn = !!get(data, "me", false);

              if (data && data.me && isLoggedIn) {
                return (
                  <Button
                    variant="action"
                    style={{ display: "flex" }}
                    key={commentId}
                    onClick={async () => {
                      const response = await mutate({
                        variables: {
                          id: commentId
                        },
                        update: (cache, { data }) => {
                          if (!data) {
                            return;
                          }

                          const x = cache.readQuery<
                            GetCommentsByIdQuery,
                            GetCommentsByIdVariables
                          >({
                            query: getCommentsByIdQuery,
                            variables: {
                              input: { postingId }
                            }
                          });

                          cache.writeQuery<
                            GetCommentsByIdQuery,
                            GetCommentsByIdVariables
                          >({
                            query: getCommentsByIdQuery,
                            variables: {
                              input: { postingId }
                            },
                            data: {
                              __typename: "Query",
                              findCommentsById: {
                                __typename: "FindCommentResponse",
                                comments: [
                                  ...x!.findCommentsById.comments.filter(
                                    c => c.id !== commentId
                                  )
                                ],
                                hasMore: false
                              }
                            }
                          });
                        }
                      });

                      if (response) {
                        dispatch({
                          type: "closeFlyout"
                        });
                      }
                    }}
                  >
                    <Icon size={16} fill="#5C6AC4" name={"x"} />
                    <Text ml={2}>Delete Comment</Text>
                  </Button>
                );
              }

              return null;
            }}
          </MeComponent>
        </>
      )}
    </DeleteCommentComponent>
  );
};