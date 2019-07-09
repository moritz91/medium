import React from "react";
import {
  MeComponent,
  AddUserPostingComponent
} from "../../components/apollo-components";
import { get } from "lodash";
import { Button } from "../../components/button";
import { Icon } from "../../components/icon";

interface Props {
  onClick?: () => void;
  postingId: string;
}

export const AddUserPosting = ({ onClick, postingId }: Props) => {
  return (
    <AddUserPostingComponent>
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
                    key={postingId}
                    onClick={async () => {
                      const response = await mutate({
                        variables: {
                          postingId
                        }
                      });

                      if (response && onClick) {
                        onClick();
                      }
                    }}
                  >
                    <Icon name="saveStory" fill="#000" size={25} />
                  </Button>
                );
              }

              return null;
            }}
          </MeComponent>
        </>
      )}
    </AddUserPostingComponent>
  );
};
