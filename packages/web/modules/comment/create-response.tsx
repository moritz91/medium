import { useMutation } from "@apollo/react-hooks";
import { text } from "body-parser";
import { GetCommentsByIdQuery, GetCommentsByIdVariables } from "components/apollo-components";
import { Avatar } from "components/common";
import { useAuth } from "context/auth-context";
import gql from "graphql-tag";
import { createCommentMutation } from "graphql/comment/mutation/create-comment";
import { createReplyMutation } from "graphql/comment/mutation/create-reply";
import { getCommentsByIdQuery } from "graphql/comment/query/get-comments-by-id";
import { get } from "lodash";
import { CommentForm, EditorSubmitProps } from "modules/post/shared/comment-form";
import React from "react";
import { Flex } from "rebass";
import { Link } from "server/routes";

interface CreateResponseProps {
  onEditorSubmit: (T: EditorSubmitProps) => void;
  isReply: boolean;
  commentId: string;
  postingId: string;
}

export const CreateResponse = ({
  onEditorSubmit,
  isReply,
  commentId,
  postingId,
  ...props
}: CreateResponseProps): JSX.Element => {
  const { data: meData } = useAuth();

  const [createComment, { data: commentData }] = useMutation(createCommentMutation, {
    variables: { comment: { postingId, text } },
    update: (cache, { data }) => {
      if (!data) {
        return;
      }

      const x = cache.readQuery<GetCommentsByIdQuery, GetCommentsByIdVariables>({
        query: getCommentsByIdQuery,
        variables: {
          input: { postingId },
        },
      });

      cache.writeQuery<GetCommentsByIdQuery, GetCommentsByIdVariables>({
        query: getCommentsByIdQuery,
        variables: {
          input: { postingId },
        },
        data: {
          __typename: "Query",
          findCommentsById: {
            __typename: "FindCommentResponse",
            comments: [data.createComment.comment, ...x!.findCommentsById.comments],
            hasMore: false,
          },
        },
      });
    },
  });

  const [createReply, { data: replyData }] = useMutation(createReplyMutation, {
    variables: { reply: { commentId, text } },
    update: (cache, { data }) => {
      if (!data) {
        return;
      }

      const x = cache.readFragment<any>({
        id: `Comment:${commentId}`,
        fragment: gql`
          fragment Reply on Comment {
            replies {
              id
              text
            }
          }
        `,
      });

      if (x.replies) {
        cache.writeFragment({
          id: `Comment:${commentId}`,
          fragment: gql`
            fragment Reply on Comment {
              __typename
              replies {
                id
                text
              }
            }
          `,
          data: {
            __typename: "Comment",
            replies: [...x!.replies, data.createReply.reply],
          },
        });
      } else {
        cache.writeFragment({
          id: `Comment:${commentId}`,
          fragment: gql`
            fragment Reply on Comment {
              __typename
              replies {
                id
                text
              }
            }
          `,
          data: {
            __typename: "Comment",
            replies: [data.createReply.reply],
          },
        });
      }
    },
  });

  if (meData) {
    let isLoggedIn = !!get(meData, "me", false);

    if (meData && meData.me && isLoggedIn) {
      const { pictureUrl, username } = meData!.me!;

      return (
        <Flex my={15}>
          <span style={{ marginRight: 10 }}>
            <Link route={"profile"} params={{ username }}>
              <a style={{ cursor: "pointer" }}>
                <Avatar borderRadius={3} size={34} src={pictureUrl} alt="avatar" />
              </a>
            </Link>
          </span>
          <CommentForm
            {...props}
            isReply={isReply}
            onEditorSubmit={onEditorSubmit}
            postingId={postingId}
            commentId={commentId}
            createReply={createReply}
            createComment={createComment}
            replyData={replyData}
            commentData={commentData}
          />
        </Flex>
      );
    }
  }
  return <div />;
};
