import * as React from "react";
import { useReducer, useRef } from "react";
import styled from "styled-components";

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

export const TagInputField = (): JSX.Element => {
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
    <Container>
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
        <input ref={inputRef} />
      </form>
    </Container>
  );
};
