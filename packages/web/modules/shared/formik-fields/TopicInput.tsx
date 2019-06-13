import * as React from "react";
import styled from "styled-components";
import { GetTagsByLettersComponent } from "../../../components/apollo-components";
import { MultiDownshift } from "../../../utils/multiDownshift";
import { includes } from "lodash";
import { Button } from "../../../components/button";

const Input = styled.input`
  width: 100%;
  font-size: 12px;
  word-wrap: break-word;
  line-height: 1em;
  outline: 0;
  min-height: 2em;
  padding: 1em 2em 1em 1em;
  color: rgba(0, 0, 0, 0.87);
  border: 1px solid rgba(34, 36, 38, 0.15);
  border-radius: 0.3rem;
  transition: box-shadow 0.1s ease, width 0.1s ease;
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

const MatchingTags = styled.ul`
  padding: 0;
  list-style: none;
  list-style-image: none;
  margin: 0;
`;

const MatchingTagsItem = styled.li`
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

const MatchingTagsItemText = styled.strong`
  margin-left: 5px;
  font-weight: 700;
`;

export const TopicInputField = (): JSX.Element => {
  const input = React.createRef<any>();
  const itemToString = (item: any) => (item ? item : "");
  return (
    <div
      style={{
        display: "flex",
        width: "50%",
        flexDirection: "column",
        marginTop: 50,
        lineHeight: "20px",
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
              <span style={{ fontWeight: "inherit" }}>
                Choose a topic for your article
              </span>
            </p>
            <div
              style={{
                position: "relative",
                borderRadius: "6px",
                borderBottomRightRadius: isOpen ? 0 : 6,
                borderBottomLeftRadius: isOpen ? 0 : 6,
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
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center"
                }}
              >
                {selectedItems.length > 0 &&
                  selectedItems.map((item: any, idx: number) => (
                    <div
                      key={idx}
                      style={{
                        margin: 2,
                        paddingTop: 2,
                        paddingBottom: 2,
                        paddingLeft: 2,
                        paddingRight: 2,
                        borderRadius: 2
                      }}
                    >
                      <div
                        style={{
                          display: "grid",
                          gridAutoFlow: "column"
                        }}
                      >
                        <Button
                          variant="primary"
                          style={{
                            fontWeight: 400,
                            fontStyle: "normal",
                            color: "#fff",
                            fontSize: "12px",
                            letterSpacing: "0",
                            textDecoration: "none",
                            background: "#6DC1FD",
                            padding: "5px 10px"
                          }}
                        >
                          {item}
                        </Button>
                        <div
                          {...getRemoveButtonProps({ idx })}
                          style={{
                            cursor: "pointer",
                            position: "relative ",
                            top: 0,
                            right: 0
                          }}
                        >
                          𝘅
                        </div>
                      </div>
                    </div>
                  ))}
                <Input
                  {...getInputProps({
                    ref: input,
                    onKeyDown(e: any) {
                      if (e.key === "Backspace" && !inputValue) {
                        removeItem(selectedItems.length - 1);
                      }
                      if (
                        e.key === "Enter" &&
                        inputValue &&
                        highlightedIndex == null
                      ) {
                        if (!includes(selectedItems, inputValue)) {
                          addSelectedItem(inputValue);
                        }
                      }
                    },
                    placeholder: "Choose a topic..."
                  })}
                />
              </div>
            </div>
            <Popover {...getMenuProps({ isOpen })}>
              {isOpen && (
                <GetTagsByLettersComponent variables={{ letters: inputValue }}>
                  {({ data, loading }) => {
                    if (loading) {
                      return <div>Loading...</div>;
                    }
                    const { getTagsByLetters } = data!;
                    const matchingTags = getTagsByLetters!.tags.map(
                      tag => tag.name
                    );

                    return (
                      <PopoverInner>
                        <MatchingTags>
                          {matchingTags.map((item: any, idx: any) => (
                            <MatchingTagsItem
                              {...getItemProps({
                                item,
                                idx,
                                active: highlightedIndex === idx,
                                selected: includes(selectedItems, item)
                              })}
                              key={idx}
                            >
                              <MatchingTagsItemText>
                                {item}
                              </MatchingTagsItemText>
                            </MatchingTagsItem>
                          ))}
                        </MatchingTags>
                      </PopoverInner>
                    );
                  }}
                </GetTagsByLettersComponent>
              )}
            </Popover>
          </div>
        )}
      </MultiDownshift>
    </div>
  );
};
