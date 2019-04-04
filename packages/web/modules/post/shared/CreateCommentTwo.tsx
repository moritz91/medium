import React, { useContext } from "react";
import { CommentForm, TextEditorResult } from "./CommentForm";
import { PostContext } from "./PostContext";
import {
  CommentInfoFragment,
  CreateCommentComponent,
  GetCommentsByIdQuery,
  GetCommentsByIdVariables
} from "../../../components/apollo-components";
import { getCommentsByIdQuery } from "../../../graphql/comment/query/getCommentsById";

interface EditorSubmitProps {
  submitted: boolean;
  response?: CommentInfoFragment | void;
}

interface PostingReplyProps {
  lineNum?: number;
  onEditorSubmit: (T: EditorSubmitProps) => void;
  view: "code-view" | "repo-view";
}

export const CreatePostingReply = ({
  onEditorSubmit,
  ...props
}: PostingReplyProps): JSX.Element => {
  const { postingId } = useContext(PostContext);

  return (
    <CreateCommentComponent>
      {mutate => {
        const submitForm = async ({
          cancel,
          text
        }: TextEditorResult): Promise<void> => {
          if (!cancel) {
            // save result
            const response = await mutate({
              variables: {
                comment: {
                  postingId,
                  text
                }
              },
              update: (cache, { data }) => {
                if (!data) {
                  return;
                }

                const x = cache.readQuery<
                  GetCommentsByIdQuery,
                  GetCommentsByIdVariables
                >({
                  query: getCommentsByIdQuery,
                  variables: {
                    input: { postingId }
                  }
                });

                cache.writeQuery<
                  GetCommentsByIdQuery,
                  GetCommentsByIdVariables
                >({
                  query: getCommentsByIdQuery,
                  variables: {
                    input: { postingId }
                  },
                  data: {
                    __typename: "Query",
                    findCommentsById: {
                      __typename: "FindCommentResponse",
                      comments: [
                        ...x!.findCommentsById.comments,
                        data.createComment.comment
                      ],
                      hasMore: false
                    }
                  }
                });
              }
            });

            onEditorSubmit({
              submitted: true,
              response:
                response && response.data && response.data.createComment.comment
            });
          } else {
            onEditorSubmit({ submitted: false });
          }
        };
        return (
          <CommentForm {...props} isReply={true} submitForm={submitForm} />
        );
      }}
    </CreateCommentComponent>
  );
};
