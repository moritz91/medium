import * as React from "react";
import styled from "styled-components";
import { GetTagsByLettersComponent } from "../../../components/apollo-components";
import { MultiDownshift } from "../../../utils/multiDownshift";
import { includes } from "lodash";

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

const MatchingTags = styled.ul`
  padding: 0;
  list-style: none;
  list-style-image: none;
  margin: 0;
`;

const SelectedTagsContainer = styled.div`
  padding-top: 1px;
  padding-bottom: 1px;
  padding-left: 2px;
  padding-right: 2px;
  border-radius: 2px;

  &:first-child {
    padding-left: 0px;
    margin-left: 0px;
  }
`;

const SelectedTagsItem = styled.button`
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

const SelectedTagsItemText = styled.strong`
  font-weight: 700;
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
export const TagInputField = ({ onSelectTags }: any): JSX.Element => {
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
              <span style={{ fontWeight: "inherit", color: "rgba(0,0,0,.9)" }}>
                Add or change tags (up to 5) so readers know what your story is
                about
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
                  alignItems: "center"
                }}
              >
                {onSelectTags(selectedItems)}
                {selectedItems.length > 0 &&
                  selectedItems.map((item: any, idx: number) => (
                    <SelectedTagsContainer key={idx}>
                      <div
                        style={{
                          display: "grid",
                          gridAutoFlow: "column"
                        }}
                      >
                        <SelectedTagsItem>
                          <SelectedTagsItemText>{item}</SelectedTagsItemText>
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
                        </SelectedTagsItem>
                      </div>
                    </SelectedTagsContainer>
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
                        if (
                          !includes(selectedItems, inputValue) &&
                          selectedItems.length < 5
                        ) {
                          addSelectedItem(inputValue);
                        }
                      }
                    },
                    placeholder: "Add a tag..."
                  })}
                />
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
        <GetTagsByLettersComponent variables={{ letters: inputValue }}>
          {({ data, loading }) => {
            if (loading) {
              return null;
            }
            const { getTagsByLetters } = data!;
            const matchingTags = getTagsByLetters!.tags.map(tag => tag.name);
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
                      <MatchingTagsItemText>{item}</MatchingTagsItemText>
                    </MatchingTagsItem>
                  ))}
                </MatchingTags>
              </PopoverInner>
            );
          }}
        </GetTagsByLettersComponent>
      )}
    </Popover>
  );
};
