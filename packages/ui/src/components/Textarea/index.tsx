import * as React from "react";
import styled from "styled-components";

const ResponseStream = styled.div`
  margin-top: 5px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.09);
  border-radius: 3px;
`;

const StyledTextarea = styled.textarea`
  color: rgba(0, 0, 0, 0.84);
  font-size: 20px;
  line-height: 1.4;
  appearance: none;
  font-family: "Rubik", sans-serif;
  font-weight: 500;
  width: 100%;
  padding: 10px;
  border: none;
  background-color: #242b38;
  resize: none;
  color: rgb(233, 236, 241);
`;

export const Textarea: React.FC = props => (
  <ResponseStream>
    <StyledTextarea {...props} />
  </ResponseStream>
);
