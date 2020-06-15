import { CommentInfoFragment } from "components/apollo-components";
import { Button } from "components/button";
import { Formik } from "formik";
import { FormContainer } from "modules/post/shared/comment-form/styles";
import { MarkdownEditor } from "modules/post/shared/markdown-editor";
import React, { useEffect, useRef } from "react";
import * as yup from "yup";

export interface EditorSubmitProps {
  submitted: boolean;
  response?: CommentInfoFragment | void;
}

export interface TextEditorProps {
  onEditorSubmit: (T: EditorSubmitProps) => void;
  postingId: string;
  commentId: string;
  isReply: boolean;
  lineNum?: number;
  createReply: any;
  createComment: any;
  replyData: any;
  commentData: any;
}

export interface SubmitProps {
  text: string;
  onEditorSubmit: (T: EditorSubmitProps) => void;
  postingId: string;
  commentId: string;
  isReply: boolean;
  createReply: any;
  createComment: any;
  replyData: any;
  commentData: any;
}

const highlightSelectedLines = (lineNum: number, parentElm = document.querySelector(".code-content")): void => {
  let numberElm: HTMLElement | null = parentElm && parentElm.querySelector(`[data-line-number="${lineNum}"]`);
  numberElm && (numberElm.parentNode as HTMLElement).classList.add(`is-selected-${lineNum}`);
};

const replySchema = yup.object().shape({
  text: yup.string().required(),
});

function onSubmit({
  text,
  isReply,
  onEditorSubmit,
  postingId,
  commentId,
  createReply,
  createComment,
  replyData,
  commentData,
}: SubmitProps) {
  // save result
  if (isReply) createReply({ variables: { reply: { commentId, text } } });
  else
    createComment({
      variables: { comment: { postingId, text } },
    });

  onEditorSubmit({
    submitted: true,
    response: postingId
      ? commentData && commentData.data && commentData.data.createComment.comment
      : replyData && replyData.data && replyData.data.createReply.reply,
  });
}

export const CommentForm = ({
  isReply,
  lineNum,
  onEditorSubmit,
  postingId,
  commentId,
  createComment,
  createReply,
  commentData,
  replyData,
}: TextEditorProps): JSX.Element => {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (lineNum) {
      highlightSelectedLines(lineNum);
    }
  }, []);

  // make sure the editor is fully visible
  useEffect(() => {
    if (formRef.current) {
      formRef.current.classList.add("is-open");
    }
  }, []);

  return (
    <Formik
      validationSchema={replySchema}
      initialValues={{
        title: "",
        text: "",
      }}
      onSubmit={({ text }) => {
        if (formRef.current) {
          formRef.current.classList.remove("is-open");
        }

        onSubmit({
          text,
          onEditorSubmit,
          postingId,
          commentId,
          isReply,
          createComment,
          createReply,
          commentData,
          replyData,
        });
      }}
    >
      {({ isValid, handleSubmit, values, handleChange }) => {
        return (
          <FormContainer onSubmit={handleSubmit} ref={formRef} className={""}>
            <div className="editor-outer-box">
              <MarkdownEditor isReply={isReply} text={values.text} textChange={handleChange} />
              <div className="editor-footer">
                <a
                  href="https://guides.github.com/features/mastering-markdown"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {/* <Icon size={16} name="markdown" fill="#000" /> */}
                  Styling with Markdown is supported
                </a>
                <div className="btn-box">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={!isValid}
                    className={`primary ${isValid ? "" : "disabled"}`}
                  >
                    Comment
                  </Button>
                </div>
              </div>
            </div>
          </FormContainer>
        );
      }}
    </Formik>
  );
};
