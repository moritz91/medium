import React, { useContext } from "react";
import {
  MeComponent,
  DeleteCommentComponent
} from "../../../components/apollo-components";
import { getCommentsByIdQuery } from "../../../graphql/comment/query/getCommentsById";
import { get } from "lodash";
import { PostContext } from "./PostContext";
import { getPostingByIdQuery } from "../../../graphql/post/query/getPostingById";

interface Props {
  commentId: string;
}

export const DeleteComment = (props: Props) => {
  const { commentId } = props;
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
                  <div
                    key={commentId}
                    style={{ cursor: "pointer" }}
                    onClick={async () => {
                      await mutate({
                        variables: {
                          id: commentId
                        }
                      });
                    }}
                  >
                    delete
                  </div>
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
