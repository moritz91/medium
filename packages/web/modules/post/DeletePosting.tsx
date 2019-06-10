import React, { useContext } from "react";
import {
  MeComponent,
  DeletePostingComponent
} from "../../components/apollo-components";
import { get } from "lodash";
import { PostContext } from "./shared/postContext";
import Router from "next/router";
import { getPostingsQuery } from "../../graphql/post/query/getPostings";
import { MyButton } from "@medium/ui";

interface Props {
  onClick: () => void;
}

export const DeletePosting = ({ onClick }: Props) => {
  const { postingId } = useContext(PostContext);

  return (
    <DeletePostingComponent
      refetchQueries={[
        {
          query: getPostingsQuery,
          variables: {
            input: {
              limit: 6,
              offset: 0
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
                  <MyButton
                    variant="action"
                    key={postingId}
                    onClick={async () => {
                      const response = await mutate({
                        variables: {
                          id: postingId
                        }
                      });

                      if (response) {
                        onClick();
                      }

                      Router.replace("/posts");
                    }}
                  >
                    Delete Posting
                  </MyButton>
                );
              }

              return null;
            }}
          </MeComponent>
        </>
      )}
    </DeletePostingComponent>
  );
};
