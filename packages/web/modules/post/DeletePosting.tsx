import React, { useContext } from "react";
import {
  MeComponent,
  DeletePostingComponent
} from "../../components/apollo-components";
import { get } from "lodash";
import { PostContext } from "./shared/PostContext";
import Router from "next/router";
import { getPostingsQuery } from "../../graphql/post/query/getPostings";
import { Icon } from "@medium/ui";

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
                    <Icon name="comment" fill="rgb(183, 193, 198" />
                    <Icon name="downArrow" fill="rgb(183, 193, 198" />
                    <Icon name="reply" fill="rgb(183, 193, 198" />
                    <Icon name="clock" fill="rgb(183, 193, 198" />
                    <Icon name="search" fill="rgb(183, 193, 198" />
                    <Icon name="link" fill="rgb(183, 193, 198" />
                    <Icon name="file" fill="rgb(183, 193, 198" />
                    <Icon name="folder" fill="rgb(183, 193, 198" />
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
