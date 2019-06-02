import * as React from "react";
import styled from "styled-components";
import { buttonStyle } from "styled-system";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "topic" | "form" | "github" | "tag";
}

const StyledButton = styled.button`
  appearance: none;
  border: none;
  text-align: center;
  font-family: "Rubik", sans-serif;
  text-transform: uppercase;
  font-weight: 500;
  cursor: pointer;
  outline: none;
  ${buttonStyle}
`;

export const MyButton: React.FC<Props> = props => <StyledButton {...props} />;
