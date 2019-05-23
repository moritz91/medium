import * as React from "react";
import styled from "styled-components";
import { GetTagsByLettersComponent } from "../../../components/apollo-components";
import { MultiDownshift } from "../../../utils/multiDownshift";
import { includes } from "lodash";

const Input = styled.input`
  width: 100%;
  font-size: 14px;
  word-wrap: break-word;
  line-height: 1em;
  outline: 0;
  whitespace: normal;
  min-height: 2em;
  background: #fff;
  display: inline-block;
  padding: 1em 2em 1em 1em;
  color: rgba(0, 0, 0, 0.87);
  boxshadow: none;
  border: 1px solid rgba(34, 36, 38, 0.15);
  borderradius: 0.3rem;
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
        fontSize: "14px"
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
                        paddingLeft: 8,
                        paddingRight: 8,
                        display: "inline-block",
                        backgroundColor: "#ccc",
                        borderRadius: 2
                      }}
                    >
                      <div
                        style={{
                          display: "grid",
                          gridGap: 6,
                          gridAutoFlow: "column",
                          alignItems: "center"
                        }}
                      >
                        <button
                          style={{
                            fontWeight: 400,
                            fontStyle: "normal",
                            color: "#000",
                            fontSize: "15px",
                            letterSpacing: "0",
                            textDecoration: "none",
                            background: "#fff",
                            borderRadius: "3px",
                            border: "1px solid #f0f0f0",
                            padding: "5px 10px"
                          }}
                        >
                          {item}
                        </button>
                        <button
                          {...getRemoveButtonProps({ idx })}
                          style={{
                            cursor: "pointer",
                            position: "absolute",
                            top: 0,
                            right: 0
                          }}
                        >
                          𝘅
                        </button>
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
