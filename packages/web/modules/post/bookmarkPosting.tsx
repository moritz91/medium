import React, { useState } from "react";
import { get } from "lodash";
import { Button } from "../../components/button";
import { Icon } from "../../components/icon";
import { useMutation } from "@apollo/react-hooks";
import { addBookmarkMutation } from "../../graphql/post/mutation/addBookmark";
import { removeBookmarkMutation } from "../../graphql/post/mutation/removeBookmark";
import { useAuth } from "../../context/AuthContext";

interface BookmarkPostingProps {
  isBookmark: boolean | null;
  postingId: string;
}

export const BookmarkPosting = ({
  postingId,
  isBookmark,
}: BookmarkPostingProps) => {
  const [addBookmark] = useMutation(addBookmarkMutation);
  const [removeBookmark] = useMutation(removeBookmarkMutation);
  const [bookmarked, setBookmark] = useState(isBookmark);

  const { data } = useAuth();
  let isLoggedIn = !!get(data, "me", false);

  if (data && data.me && isLoggedIn) {
    return (
      <div>
        <Button variant="action" style={{ paddingRight: 8 }}>
          {bookmarked ? (
            <Icon
              onClick={() => (
                removeBookmark({ variables: { postingId } }),
                setBookmark(!bookmarked)
              )}
              name="saveStory"
              fill="#000"
              size={26}
            />
          ) : (
            <Icon
              onClick={() => (
                addBookmark({ variables: { postingId } }),
                setBookmark(!bookmarked)
              )}
              name="saveStory"
              fill="rgb(238, 238, 238)"
              size={26}
            />
          )}
        </Button>
      </div>
    );
  }

  return null;
};
