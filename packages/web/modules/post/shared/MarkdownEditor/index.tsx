import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Field } from "formik";
import schema from "hast-util-sanitize/lib/github.json";
import remark from "remark";
import remarkPing from "remark-ping";
import remark2react from "remark-react";
import { Node } from "unist";
import visit from "unist-util-visit";

import { CommentInputField } from "../../../shared/formik-fields/CommentInputField";
import { commandsHandler, EditCommand, keyBoardCommands } from "./commands";
import { EditorContainer } from "./components";
import { LineNumberStyle } from "../../../../components/codeCard";
import { getHighlightedCode } from "../../../../utils/highlightCode";
import { Tab, Toolbar } from "./toolbar";
import "../../../../github-markdown.css";

interface EditorProps {
  isReply: boolean;
  text: string;
  textChange: (c: EditCommand) => void;
}

let isIE8 = false;

export const MarkdownEditor: React.FC<EditorProps> = React.memo(
  ({ isReply, text, textChange }) => {
    const writeRef = useRef<HTMLTextAreaElement>(null);
    const [tab, setTab] = useState<Tab>("write");

    const handleTabChange = useCallback(async (newTab: Tab) => {
      if (newTab === "write") {
        await setTab("write");
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
        <Toolbar
          tab={tab}
          isIE8={isIE8}
          onCommand={handleCommand}
          handleTabChange={handleTabChange}
        />
        <div className={`${tab === "write" ? "selected " : ""}write-content`}>
          <Field
            inputRef={writeRef}
            component={CommentInputField}
            autoFocus={isReply}
            minHeight="100px"
            name="text"
            placeholder={
              isReply
                ? "Write a response..."
                : "What do you want to talk about?"
            }
            onKeyDown={handleKeyCommand}
            as="textarea"
          />
        </div>
        {tab === "preview" && (
          <div
            className="preview-content selected"
            style={{
              minHeight:
                (writeRef.current && writeRef.current.style.height) || "100px",
            }}
          >
            <MarkdownRenderer text={text.trim() || "Nothing to preview."} />
          </div>
        )}
      </EditorContainer>
    );
  },
);

const HighlightCode = ({ children }: { children: string }): JSX.Element => {
  try {
    const { value, lang, meta } = JSON.parse(children);
    return <code>{getHighlightedCode(value, lang, parseInt(meta))}</code>;
  } catch (ex) {
    return <code>{children}</code>;
  }
};

const sanitize = {
  ...schema,
  attributes: {
    ...schema.attributes,
    a: [...schema.attributes.a, ["class", "ping ping-link"]],
  },
};

const setCodeProps = (): ((ast: Node[]) => void) => {
  return (ast: Node[]): void =>
    visit(
      ast,
      "code",
      (node: Node): void => {
        const { lang, meta, value } = node;
        node.value = JSON.stringify({ value, lang, meta });
      },
    );
};

const MarkdownContainer = styled("div")`
  & .ping-link {
    border-radius: 4px;
    padding: 0px 4px 1px;
    font-weight: 600;
  }
  & .token.line-number {
    ${LineNumberStyle}
  }
`;

interface MarkdownRendererProps {
  text: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  text,
}): JSX.Element => (
  <MarkdownContainer className="markdown-body">
    {
      remark()
        .use(remarkPing, {
          pingUsername: () => true,
          userURL: (username: string) => `http://localhost:3000/@${username}`,
        })
        .use(setCodeProps)
        .use(remark2react, {
          sanitize,
          remarkReactComponents: {
            code: HighlightCode,
          },
        })
        .processSync(text).contents
    }
  </MarkdownContainer>
);
