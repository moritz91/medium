import * as React from "react";
import styled, { css } from "styled-components";
import { buttonStyle } from "styled-system";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "topic" | "form" | "github" | "tag" | "action";
  hoverEffect?: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  border: none;
  text-align: center;
  font-weight: 500;
  cursor: pointer;
  ${buttonStyle}

  ${({ hoverEffect }) =>
    hoverEffect &&
    css`
  & :hover, :focus {
    color: #5c6ac4;
  `}
`;

export const Button: React.FC<ButtonProps> = props => (
  <StyledButton {...props} />
);
