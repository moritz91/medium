import * as React from "react";
import {
  MeComponent,
  DeleteCommentComponent
} from "../../../components/apollo-components";
import { getCommentsByIdQuery } from "../../../graphql/comment/query/getCommentsById";
import { Icon } from "@medium/ui";
import { get } from "lodash";

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
                  <Icon
                    key={commentId}
                    name="x"
                    fill="#fff"
                    style={{ cursor: "pointer" }}
                    onClick={async () => {
                      await mutate({
                        variables: {
                          id: commentId
                        }
                      });
                    }}
                  />
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
