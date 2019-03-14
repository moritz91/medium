import * as React from "react";
import {
  MeComponent,
  DeleteCommentComponent
} from "../../../components/apollo-components";
import { getCommentsByIdQuery } from "../../../graphql/comment/query/getCommentsById";
import { get } from "lodash";
import { Box } from "rebass";

interface Props {
  commentId: string;
  postingId: string;
}

export const DeleteComment = (props: Props) => {
  const { commentId, postingId } = props;

  return (
    <DeleteCommentComponent
      refetchQueries={[
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

              return <div key={commentId} />;
            }}
          </MeComponent>
        </>
      )}
    </DeleteCommentComponent>
  );
};
