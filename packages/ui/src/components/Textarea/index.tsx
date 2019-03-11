import * as React from "react";
import styled from "styled-components";

const ResponseStream = styled.div`
  margin-top: 5px;
  padding: 0 20px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.09);
  border-radius: 3px;
  padding-left: 20px;
  padding-right: 20px;
`;

const StyledTextarea = styled.textarea`
  color: rgba(0, 0, 0, 0.84);
  font-size: 20px;
  line-height: 1.4;
  appearance: none;
  border: none;
  font-family: "Rubik", sans-serif;
  font-weight: 500;
  outline: none;
`;

export const MyTextarea: React.FC = props => (
  <ResponseStream>
    <StyledTextarea {...props} />
  </ResponseStream>
);
