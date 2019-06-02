import * as React from "react";
import styled from "styled-components";
import { buttonStyle } from "styled-system";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "topic" | "form" | "github" | "tag" | "action";
}

const StyledButton = styled.button`
  border: none;
  text-align: center;
  font-weight: 500;
  cursor: pointer;
  ${buttonStyle}
`;

export const MyButton: React.FC<Props> = props => <StyledButton {...props} />;
