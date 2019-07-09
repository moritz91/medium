import React, { useContext } from "react";
import {
  MeComponent,
  AddUserPostingComponent
} from "../../components/apollo-components";
import { get } from "lodash";
import {
  PostContext,
  PostContextProps
} from "../../components/context/PostContext";
import { Button } from "../../components/button";
import { Icon } from "../../components/icon";

interface Props {
  onClick?: () => void;
}

export const AddUserPosting = ({ onClick }: Props) => {
  const { postingId } = useContext<PostContextProps>(PostContext);

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
                          postingId: postingId
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
