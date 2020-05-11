import { useApolloClient, useMutation } from "@apollo/react-hooks";
import { Button } from "components/button";
import { Icon } from "components/icon";
import { useAuth } from "context/auth-context";
import { FlyoutContext, FlyoutContextProps } from "context/flyout-context";
import { deleteReplyMutation } from "graphql/comment/mutation/delete-reply";
import { get } from "lodash";
import React, { useContext } from "react";
import { Text } from "rebass";

interface DeleteReplyProps {
  replyId: string;
}

export const DeleteReply = ({ replyId }: DeleteReplyProps) => {
  const client = useApolloClient();

  const { dispatch } = useContext<FlyoutContextProps>(FlyoutContext);
  const [deleteReply] = useMutation(deleteReplyMutation, {
    variables: { id: replyId },
    onCompleted() {
      dispatch({
        type: "closeFlyout",
      });
    },
  });

  const { data } = useAuth();
  let isLoggedIn = !!get(data, "me", false);

  if (data && data.me && isLoggedIn) {
    return (
      <div>
        <Button
          variant="action"
          style={{ paddingRight: 8, display: "flex" }}
          onClick={() => {
            deleteReply({ variables: { id: replyId } }), client.resetStore();
          }}
        >
          <Icon size={16} fill="#5C6AC4" name={"x"} />
          <Text ml={2}>Delete Reply</Text>
        </Button>
      </div>
    );
  }

  return null;
};
