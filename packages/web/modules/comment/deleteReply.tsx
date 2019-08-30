import React, { useContext } from "react";
import { deleteReplyMutation } from "../../graphql/comment/mutation/deleteReply";
import { useMutation, useApolloClient } from "@apollo/react-hooks";
import { useAuth } from "../../context/AuthContext";
import { Text } from "rebass";
import { get } from "lodash";
import { Button } from "../../components/button";
import { Icon } from "../../components/icon";
import { FlyoutContextProps, FlyoutContext } from "../../context/FlyoutContext";

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
        type: "closeFlyout"
      });
    }
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
