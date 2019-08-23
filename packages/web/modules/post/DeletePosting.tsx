import React, { useContext } from "react";
import { DeletePostingComponent } from "../../components/apollo-components";
import { get } from "lodash";
import Router from "next/router";
import { getPostingsQuery } from "../../graphql/post/query/getPostings";
import { Button } from "../../components/button";
import { Text } from "rebass";
import { Icon } from "../../components/icon";
import { PostContext } from "../../context/PostContext";
import { FlyoutContextProps, FlyoutContext } from "../../context/FlyoutContext";
import { useAuth } from "../../context/AuthContext";

export const DeletePosting = () => {
  const { postingId } = useContext(PostContext);
  const { dispatch } = useContext<FlyoutContextProps>(FlyoutContext);
  const { data } = useAuth();

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
      {mutate => {
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
                    type: "closeFlyout"
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
    </DeletePostingComponent>
  );
};
