import { Button } from "components/button";
import { Icon } from "components/icon";
import { FlyoutContext } from "context/flyout-context";
import Router from "next/router";
import React, { useContext } from "react";
import { Text } from "rebass";

interface Props {
  commentId: string;
}

export const CopyLink = ({ commentId }: Props) => {
  const { dispatch } = useContext(FlyoutContext);
  const { query } = Router;
  const route = `localhost:3000/p/${query!.id}#${commentId}`;

  return (
    <Button
      variant="action"
      style={{ display: "flex" }}
      key={commentId}
      onClick={async () => {
        navigator.clipboard.writeText(route).then(() => dispatch({ type: "closeFlyout" }));
      }}
    >
      <Icon size={16} fill="#5C6AC4" name={"link"} />
      <Text ml={2}>Copy Link</Text>
    </Button>
  );
};
