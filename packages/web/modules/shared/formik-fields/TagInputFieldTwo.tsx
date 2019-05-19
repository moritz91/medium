import * as React from "react";
import { useReducer, useRef } from "react";
import styled from "styled-components";
import Downshift from "downshift";
import { findKey } from "lodash";
import { GetTagsByLettersComponent } from "../../../components/apollo-components";
import { Input } from "@medium/ui";

const Container = styled.div`
  padding-top: 6px;
  padding-left: 10px;
  line-height: 20px;
  text-align: left;
`;

export const TagInputFieldTwo = (): JSX.Element => {
  const inputRef = useRef(null);
  const [tags, dispatch] = useReducer((state: any, action: any) => {
    switch (action.type) {
      case "add":
        if (!findKey(state, { name: action.name.value }))
          return [
            ...state,
            {
              id: state.length,
              name: action.name.value
            }
          ];
        return state;
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
    <Downshift id="autocomplete">
      {({
        getRootProps,
        getInputProps,
        getItemProps,
        getLabelProps,
        inputValue,
        selectedItem,
        highlightedIndex,
        clearSelection,
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
          <label {...getLabelProps({ style: { width: 100, fontSize: 12 } })}>
            Add or change tags (up to 5) so readers know what your story is
            about
          </label>
          <br />
          <form onSubmit={handleTagInput}>
            <Input
              {...getInputProps({
                onChange: (e: any) => {
                  if (e.target.value === "") {
                    clearSelection();
                  }
                }
              })}
              ref={inputRef}
            />
          </form>
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
                        onClick={() => dispatch({ type: "add", item })}
                        {...getItemProps({
                          item,
                          idx,
                          key: idx,
                          style: {
                            backgroundColor:
                              highlightedIndex === idx ? "#6DC1FD" : "",
                            fontWeight:
                              selectedItem === item ? "bold" : "normal"
                          }
                        })}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                );
              }}
            </GetTagsByLettersComponent>
          )}
        </Container>
      )}
    </Downshift>
  );
};

// const AutoCompleteMenu = ({
//   inputValue,
//   selectedItem,
//   highlightedIndex,
//   getItemProps,
//   dispatch
// }: any) => {
//   return (
//     <GetTagsByLettersComponent variables={{ letters: inputValue }}>
//       {({ data, loading }) => {
//         if (loading) {
//           return <div>Loading...</div>;
//         }
//         const { getTagsByLetters } = data!;
//         const matchingTags = getTagsByLetters!.tags.map(tag => tag.name);

//         return (
//           <div>
//             {matchingTags.map((item: any, idx: any) => (
//               <div
//                 onClick={() => dispatch({ type: "add", idx })}
//                 {...getItemProps({
//                   item,
//                   idx,
//                   key: idx,
//                   style: {
//                     backgroundColor:
//                       highlightedIndex === idx ? "gray" : "white",
//                     fontWeight: selectedItem === item ? "bold" : "normal"
//                   }
//                 })}
//               >
//                 {item}
//               </div>
//             ))}
//           </div>
//         );
//       }}
//     </GetTagsByLettersComponent>
//   );
// };
