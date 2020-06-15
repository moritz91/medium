import { Field } from "formik";
import { commandsHandler, EditCommand, keyBoardCommands } from "modules/post/shared/markdown-editor/commands";
import { MarkdownRenderer } from "modules/post/shared/markdown-editor/renderer";
import { EditorContainer } from "modules/post/shared/markdown-editor/styles";
import { Tab, Toolbar } from "modules/post/shared/markdown-editor/toolbar";
import { CommentInputField } from "modules/shared/formik-fields/comment-input-field";
import React, { useCallback, useEffect, useRef, useState } from "react";

interface EditorProps {
  isReply: boolean;
  text: string;
  textChange: (c: EditCommand) => void;
}

let isIE8 = false;

export const MarkdownEditor: React.FC<EditorProps> = React.memo(({ isReply, text, textChange }) => {
  const writeRef = useRef<HTMLTextAreaElement>(null);
  const [tab, setTab] = useState<Tab>("write");

  const handleTabChange = useCallback(async (newTab: Tab) => {
    if (newTab === "write") {
      setTab("write");
      writeRef.current && writeRef.current.focus();
    } else {
      setTab("preview");
    }
  }, []);

  const handleCommand = useCallback((name: string) => {
    if (writeRef.current) {
      commandsHandler(name, writeRef.current, textChange);
    }
  }, []);

  const handleKeyCommand = useCallback((e: React.KeyboardEvent) => {
    const command = !isIE8 && keyBoardCommands(e);
    if (command) {
      handleCommand(command);
      e.preventDefault();
    }
  }, []);

  // useLayoutEffect(() => {
  //   const textarea = writeRef.current;
  //   // textarea selectionStart and selectionEnd does not exist on IE8
  //   isIE8 = textarea
  //     ? typeof textarea.selectionStart !== "number" ||
  //       typeof textarea.selectionEnd !== "number"
  //     : false;
  // }, []);

  // dynamically set textarea height
  useEffect(() => {
    const textarea = writeRef.current;
    if (textarea) {
      textarea.style.height = "100px";
      textarea.style.height = textarea.scrollHeight + 2 + "px";
    }
  }, [text]);

  return (
    <EditorContainer>
      <Toolbar tab={tab} isIE8={isIE8} onCommand={handleCommand} handleTabChange={handleTabChange} />
      <div className={`${tab === "write" ? "selected " : ""}write-content`}>
        <Field
          inputRef={writeRef}
          component={CommentInputField}
          autoFocus={isReply}
          minHeight="100px"
          name="text"
          placeholder={isReply ? "Write a response..." : "What do you want to talk about?"}
          onKeyDown={handleKeyCommand}
          as="textarea"
        />
      </div>
      {tab === "preview" && (
        <div
          className="preview-content selected"
          style={{
            minHeight: (writeRef.current && writeRef.current.style.height) || "100px",
          }}
        >
          <MarkdownRenderer text={text.trim() || "Nothing to preview."} />
        </div>
      )}
    </EditorContainer>
  );
});
