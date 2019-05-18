import * as React from "react";
import { useReducer, useRef } from "react";
import styled from "styled-components";
import Downshift from "downshift";
import { GetTagsByLettersComponent } from "../../../components/apollo-components";

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
    <Downshift id="autocomplete" onChange={() => handleTagInput}>
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
          <form onSubmit={handleTagInput}>
            <label {...getLabelProps()}>
              Add or change tags (up to 5) so readers know what your story is
              about
            </label>
            <br />
            <input
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
          {isOpen ? (
            <div>
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
            </div>
          ) : null}
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
