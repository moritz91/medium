import React, { useContext } from "react";
import {
  MeComponent,
  DeleteCommentComponent
} from "../../components/apollo-components";
import { getCommentsByIdQuery } from "../../graphql/comment/query/getCommentsById";
import { getPostingByIdQuery } from "../../graphql/post/query/getPostingById";
import { get } from "lodash";
import { PostContext } from "../post/shared/postContext";
import { Button } from "../../components/button";

interface Props {
  commentId: string;
  onClick: () => void;
}

export const DeleteComment = ({ commentId, onClick }: Props) => {
  const { postingId } = useContext(PostContext);

  return (
    <DeleteCommentComponent
      refetchQueries={[
        {
          query: getPostingByIdQuery,
          variables: {
            id: postingId
          }
        },
        {
          query: getCommentsByIdQuery,
          variables: {
            input: {
              postingId
            }
          }
        }
      ]}
    >
      {mutate => (
        <>
          <MeComponent>
            {({ data, loading }) => {
              if (loading) {
                return null;
              }

              let isLoggedIn = !!get(data, "me", false);

              if (data && data.me && isLoggedIn) {
                return (
                  <Button
                    variant="action"
                    key={commentId}
                    onClick={async () => {
                      const response = await mutate({
                        variables: {
                          id: commentId
                        }
                      });

                      if (response) {
                        onClick();
                      }
                    }}
                  >
                    Delete Comment
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
