import * as React from "react";
import { useReducer, useRef } from "react";
import styled from "styled-components";
import Downshift from "downshift";

const Container = styled.div`
  border-color: rgba(0, 0, 0, 0.15);
  border: 1px solid;
  background: #fafafa;
  padding-top: 6px;
  padding-left: 10px;
  line-height: 20px;
  font-size: 16px;
  text-align: left;
  display: flex;
`;

export const TagInputFieldTwo = (): JSX.Element => {
  const inputRef = useRef(null);
  const [tags, dispatch] = useReducer((state: any, action: any) => {
    switch (action.type) {
      case "add":
        return [
          ...state,
          {
            id: state.length,
            name: action.name.value
          }
        ];
      case "remove":
        return state.filter((_: any, idx: any) => idx != action.idx);
      default:
        return state;
    }
  }, []);

  const handleTagInput = (e: any) => {
    e.preventDefault();
    dispatch({
      type: "add",
      name: inputRef.current
    });
  };

  return (
    <Downshift onChange={item => alert(item)}>
      {({
        getRootProps,
        getInputProps,
        getItemProps,
        getLabelProps,
        inputValue,
        selectedItem,
        highlightedIndex,
        isOpen
      }: any) => (
        <Container {...getRootProps({} as any)}>
          {tags!.map((tag: any, idx: any) => (
            <div key={idx}>
              <button
                style={{ padding: 5 }}
                onClick={() => dispatch({ type: "remove", idx })}
              >
                {tag.name} x
              </button>
            </div>
          ))}
          <form onSubmit={handleTagInput}>
            <label {...getLabelProps()}>
              Add or change tags (up to 5) so readers know what your story is
              about
            </label>
            <br />
            <input {...getInputProps()} ref={inputRef} />
          </form>
          {isOpen ? (
            <div>
              <ApolloAutocompleteMenuWithData
                {...{
                  inputValue,
                  selectedItem,
                  highlightedIndex,
                  getItemProps
                }}
              />
            </div>
          ) : null}
        </Container>
      )}
    </Downshift>
  );
};

function ApolloAutocompleteMenuWithData({

}: // data: { loading },
// selectedItem,
// highlightedIndex,
// getItemProps
any) {
  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  const allColors = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" }
  ];

  return (
    <div>
      {allColors.map(
        (item: any, idx: any) => console.log(item, idx)
        // <div
        //   {...getItemProps({
        //     item,
        //     idx,
        //     key: item,
        //     style: {
        //       backgroundColor: highlightedIndex === idx ? "gray" : "white",
        //       fontWeight: selectedItem === item ? "bold" : "normal"
        //     }
        //   })}
        // >
        //   {item}
        // </div>
      )}
    </div>
  );
}
