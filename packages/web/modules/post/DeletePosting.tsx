import React, { useContext } from "react";
import {
  MeComponent,
  DeletePostingComponent
} from "../../components/apollo-components";
import { get } from "lodash";
import { PostContext } from "../../components/context/PostContext";
import Router from "next/router";
import { getPostingsQuery } from "../../graphql/post/query/getPostings";
import { Button } from "../../components/button";
import { Text } from "rebass";
import { Icon } from "../../components/icon";
import {
  FlyoutContext,
  FlyoutContextProps
} from "../../components/context/FlyoutContext";

export const DeletePosting = () => {
  const { postingId } = useContext(PostContext);
  const { dispatch } = useContext<FlyoutContextProps>(FlyoutContext);

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
                    key={postingId}
                    onClick={async () => {
                      const response = await mutate({
                        variables: {
                          id: postingId
                        }
                      });

                      if (response) {
                        dispatch({
                          type: "close"
                        });
                      }

                      Router.replace("/posts");
                    }}
                  >
                    <Icon size={16} fill="#5C6AC4" name={"x"} />
                    <Text ml={2}>Delete Posting</Text>
                  </Button>
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
