import React, { useContext } from "react";
import {
  MeComponent,
  DeletePostingComponent
} from "../../components/apollo-components";
import { get } from "lodash";
import { PostContext } from "./shared/PostContext";
import Router from "next/router";
import { getPostingsQuery } from "../../graphql/post/query/getPostings";

export const DeletePosting = () => {
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
                  <div
                    key={postingId}
                    style={{ cursor: "pointer" }}
                    onClick={async () => {
                      await mutate({
                        variables: {
                          id: postingId
                        }
                      });
                      Router.replace("/posts");
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
    </DeletePostingComponent>
  );
};
