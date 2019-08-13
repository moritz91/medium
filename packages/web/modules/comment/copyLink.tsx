import React from "react";
import { Text } from "rebass";
import { Button } from "../../components/button";
import { Icon } from "../../components/icon";
import { useContext } from "react";
import Router from "next/router";
import { FlyoutContext } from "../../context/FlyoutContext";

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
        navigator.clipboard
          .writeText(route)
          .then(() => dispatch({ type: "closeFlyout" }));
      }}
    >
      <Icon size={16} fill="#5C6AC4" name={"link"} />
      <Text ml={2}>Copy Link</Text>
    </Button>
  );
};
