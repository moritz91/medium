import { Input } from "components/input";
import { FieldProps } from "formik";
import React from "react";

export const InputField = ({ field, form: { touched, errors }, ...props }: FieldProps): JSX.Element => {
  // field: { name, value, onChange, onBlur }
  // form: { touched, errors} -> also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  const errorText = touched[field.name] && errors[field.name];
  //@ts-ignore
  return <Input errorText={errorText} {...field} {...props} />;
};
