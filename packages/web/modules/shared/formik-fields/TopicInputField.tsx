import * as React from "react";
import styled from "styled-components";
import { GetTopicsByLettersComponent, GetTopicsByLettersGetTopicsByLetters } from "../../../components/apollo-components";
import { MultiDownshift } from "../../../utils/multiDownshift";
import { includes } from "lodash";
import { useState } from "react";

const Input = styled.input`
  font-size: 12px;
  word-wrap: break-word;
  line-height: 1em;
  min-height: 2em;
  padding: 1em 2em 1em 1em;
  color: rgba(0, 0, 0, 0.87);
  border: none;
`;
const Popover = styled.div`
  overflow: hidden;
  position: absolute;
  z-index: 900;
  font-size: 15px;
  text-align: center;
  pointer-events: auto;
  animation: pop-downwards 0.2s forwards linear;
`;

const PopoverInner = styled.div`
  padding: 0;
  overflow: hidden;
  min-width: 100px;
  position: relative;
  max-width: 280px;
  border-radius: 3px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25), 0 0 1px rgba(0, 0, 0, 0.35);
`;

const MatchingTopics = styled.ul`
  padding: 0;
  list-style: none;
  list-style-image: none;
  margin: 0;
`;

const SelectedTopicsContainer = styled.div`
  display: inline-block;
  padding-right: 4px;
  padding-bottom: 4px;
`;

const SelectedTopicsItem = styled.button`
  color: #5c6ac4;
  cursor: pointer;
  padding: 5px 10px;
  line-height: 2;
  font-size: 12px;
  text-align: left;
  white-space: nowrap;
  text-overflow: ellipsis;
  border-radius: 3px;
  overflow: hidden;
`;

const SelectedTopicsItemText = styled.strong`
  font-weight: 700;
`;

const MatchingTopicsItem = styled.li`
  background: ${(props: any) => (props.active ? "#03a87c" : "#fff")};
  color: ${(props: any) => (props.active ? "#fff" : "#000")};
  cursor: pointer;
  padding: 5px 10px;
  line-height: 2;
  font-size: 12px;
  text-align: left;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const MatchingTopicsItemText = styled.strong`
  margin-left: 5px;
  font-weight: 700;
`;

export const TopicInputField = (): JSX.Element => {
  const input = React.createRef<any>();
  const itemToString = (item: any) => (item ? item : "");
  const [errorText, setErrorText] = useState("");

  const handleError = (error?: string) => {
    if (error)
      setErrorText("You have already added this topic."), input.current.blur();
    else setErrorText("");
  };

  return (
    <div
      style={{
        marginTop: 30,
        fontSize: "12px"
      }}
    >
      <MultiDownshift itemToString={itemToString}>
        {({
          getInputProps,
          getMenuProps,
          getRemoveButtonProps,
          removeItem,
          isOpen,
          inputValue,
          selectedItems,
          getItemProps,
          highlightedIndex,
          addSelectedItem
        }: any) => (
          <div style={{ width: 500, margin: "auto", position: "relative" }}>
            <p style={{ fontWeight: 400 }}>
              <span style={{ fontWeight: "inherit", color: "rgba(0,0,0,.9)" }}>
                Choose the topics for your story
              </span>
            </p>
            <div
              style={{
                position: "relative",
                paddingTop: 10,
                paddingBottom: 5,
                paddingRight: 50
              }}
              onClick={() => {
                !isOpen && input.current.focus();
              }}
            >
              <div
                style={{
                  display: "block"
                }}
              >
                {selectedItems.length > 0 &&
                  selectedItems.map((item: any, idx: number) => (
                    <SelectedTopicsContainer key={idx}>
                      <SelectedTopicsItem>
                        <SelectedTopicsItemText>{item}</SelectedTopicsItemText>
                        <span
                          {...getRemoveButtonProps({ idx })}
                          style={{
                            margin: "1px",
                            paddingLeft: "6px",
                            color: "rgba(0,0,0,.54)"
                          }}
                        >
                          𝘅
                        </span>
                      </SelectedTopicsItem>
                    </SelectedTopicsContainer>
                  ))}
                <Input
                  {...getInputProps({
                    ref: input,
                    onKeyDown(e: any) {
                      if (
                        e.key === "Backspace" &&
                        !inputValue &&
                        selectedItems.length
                      ) {
                        removeItem(selectedItems.length - 1);
                      }
                      if (
                        e.key === "Enter" &&
                        inputValue &&
                        highlightedIndex == null
                      ) {
                        if (
                          !includes(selectedItems, inputValue) &&
                          selectedItems.length < 5
                        ) {
                          addSelectedItem(inputValue);
                        } else {
                          handleError(inputValue),
                            setTimeout(() => {
                              handleError();
                            }, 5000);
                        }
                      }
                    },
                    placeholder: "Add a topic..."
                  })}
                />
                <div>{errorText && errorText}</div>
              </div>
            </div>
            {Suggestions(
              getMenuProps,
              isOpen,
              inputValue,
              getItemProps,
              highlightedIndex,
              selectedItems
            )}
          </div>
        )}
      </MultiDownshift>
    </div>
  );
};

export const Suggestions = (
  getMenuProps: any,
  isOpen: any,
  inputValue: any,
  getItemProps: any,
  highlightedIndex: any,
  selectedItems: any
) => {
  return (
    <Popover {...getMenuProps({ isOpen })}>
      {isOpen && (
        <GetTopicsByLettersComponent variables={{ letters: inputValue }}>
          {({ data, loading }) => {
            if (loading) {
              return null;
            }
            const getTopicsByLetters: GetTopicsByLettersGetTopicsByLetters | null | undefined = data?.getTopicsByLetters;
            const matchingTopics = getTopicsByLetters?.topics.map(topic => topic.name);
            return (
              <PopoverInner>
                <MatchingTopics>
                  {matchingTopics?.map((item: any, idx: any) => (
                    <MatchingTopicsItem
                      {...getItemProps({
                        item,
                        idx,
                        active: highlightedIndex === idx,
                        selected: includes(selectedItems, item)
                      })}
                      key={idx}
                    >
                      <MatchingTopicsItemText>{item}</MatchingTopicsItemText>
                    </MatchingTopicsItem>
                  ))}
                </MatchingTopics>
              </PopoverInner>
            );
          }}
        </GetTopicsByLettersComponent>
      )}
    </Popover>
  );
};
