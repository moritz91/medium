import { get } from "lodash";
import React, { useContext } from "react";
import { Text } from "rebass";
import {
  DeleteCommentComponent,
  GetCommentsByIdQuery,
  GetCommentsByIdVariables,
  MeComponent
} from "../../components/apollo-components";
import { Button } from "../../components/button";
import {
  FlyoutContext,
  FlyoutContextProps
} from "../../components/context/FlyoutContext";
import { PostContext } from "../../components/context/PostContext";
import { Icon } from "../../components/icon";
import { getCommentsByIdQuery } from "../../graphql/comment/query/getCommentsById";

interface Props {
  commentId: string;
}

export const CopyLink = ({ commentId }: Props) => {
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
                    <Icon size={16} fill="#5C6AC4" name={"link"} />
                    <Text ml={2}>Copy Link</Text>
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
