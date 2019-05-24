import * as React from "react";
import styled from "styled-components";
import { GetTagsByLettersComponent } from "../../../components/apollo-components";
import { MultiDownshift } from "../../../utils/multiDownshift";
import { includes } from "lodash";
import { MyButton } from "@medium/ui";

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

const Menu = styled.ul`
  padding: 0;
  margintop: 0;
  position: absolute;
  backgroundcolor: white;
  width: 100%;
  maxheight: 20rem;
  overflowy: auto;
  overflowx: hidden;
  outline: 0;
  transition: opacity 0.1s ease;
  borderradius: 0 0 0.28571429rem 0.28571429rem;
  boxshadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
  bordercolor: #96c8da;
  bordertopwidth: 0;
  borderrightwidth: 1;
  borderbottomwidth: 1;
  borderleftwidth: 1;
  borderstyle: solid;
`;

export const TagInputField = (): JSX.Element => {
  const input = React.createRef<any>();
  const itemToString = (item: any) => (item ? item : "");
  return (
    <div
      style={{
        display: "flex",
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
                Add or change tags (up to 5) so readers know what your story is
                about
              </span>
            </p>
            <div
              style={{
                cursor: "pointer",
                position: "relative",
                borderRadius: "6px",
                borderBottomRightRadius: isOpen ? 0 : 6,
                borderBottomLeftRadius: isOpen ? 0 : 6,
                padding: 10,
                paddingRight: 50,
                boxShadow: "0 2px 3px 0 rgba(34,36,38,.15)"
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
                        <MyButton
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
                        </MyButton>
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
                    placeholder: "Add a tag..."
                  })}
                />
              </div>
            </div>
            <Menu {...getMenuProps({ isOpen })}>
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
                      <div>
                        {matchingTags.map((item: any, idx: any) => (
                          <div
                            {...getItemProps({
                              item,
                              idx,
                              // active: highlightedIndex === idx,
                              selected: includes(selectedItems, item)
                            })}
                            key={idx}
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    );
                  }}
                </GetTagsByLettersComponent>
              )}
            </Menu>
          </div>
        )}
      </MultiDownshift>
    </div>
  );
};
