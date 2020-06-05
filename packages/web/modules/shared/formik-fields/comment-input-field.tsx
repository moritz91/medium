import { InputEl } from "components/input";
import { FieldProps } from "formik";
import React from "react";
import styled from "styled-components";

interface CommentInputFieldProps extends FieldProps {
  inputRef?: React.RefObject<HTMLInputElement>;
}

interface FormInputProps {
  minHeight?: string;
  width?: string;
}

export const FormInput = styled(InputEl)`
  border: 1px solid transparent;
  font-size: 1.4rem;
  line-height: 1.5;
  min-height: ${(p: FormInputProps) => p.minHeight};
  padding: 0.6rem 1rem;
  width: ${(p: FormInputProps) => p.width || "100%"};
  &:focus {
    border: 1px solid #2188ff;
    box-shadow: inset 0 1px 2px rgba(27, 31, 35, 0.075),
      0 0 0 0.2em rgba(3, 102, 214, 0.3);
  }
  /* hide spinners on number input field
  &[type="number"]::-webkit-inner-spin-button,
  &[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type="number"] {
    -moz-appearance: textfield;
  }
  */
`;

/* eslint-disable @typescript-eslint/no-unused-vars */
export const CommentInputField = ({
  inputRef,
  field, // { name, value, onChange, onBlur }
  form: _,
  ...props
}: CommentInputFieldProps): JSX.Element => {
  return <FormInput ref={inputRef} {...field} {...props} />;
};
