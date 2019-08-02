import React, { useContext } from "react";
import { CommentForm, TextEditorResult } from "../post/shared/commentForm";
import {
  PostContext,
  PostContextProps
} from "../../components/context/PostContext";
import {
  CommentInfoFragment,
  CreateCommentComponent,
  GetCommentsByIdQuery,
  GetCommentsByIdVariables,
  MeComponent
} from "../../components/apollo-components";
import { getCommentsByIdQuery } from "../../graphql/comment/query/getCommentsById";
import { Flex } from "rebass";
import { get } from "lodash";
import { Link } from "../../server/routes";
import { Avatar } from "../../components/common/Avatar";

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
  const { postingId } = useContext<PostContextProps>(PostContext);

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
                        data.createComment.comment,
                        ...x!.findCommentsById.comments
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
          <MeComponent variables={{ withBookmarks: false }}>
            {({ data, loading }) => {
              if (loading) {
                return null;
              }

              let isLoggedIn = !!get(data, "me", false);

              if (data && data.me && isLoggedIn) {
                const { pictureUrl, username } = data!.me!;

                return (
                  <Flex my={15}>
                    <span style={{ marginRight: 10 }}>
                      <Link route={"profile"} params={{ username }}>
                        <a style={{ cursor: "pointer" }}>
                          <Avatar
                            borderRadius={3}
                            size={34}
                            src={pictureUrl}
                            alt="avatar"
                          />
                        </a>
                      </Link>
                    </span>
                    <CommentForm
                      {...props}
                      isReply={true}
                      submitForm={submitForm}
                    />
                  </Flex>
                );
              }

              return null;
            }}
          </MeComponent>
        );
      }}
    </CreateCommentComponent>
  );
};