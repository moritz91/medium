import { Input } from "components/input";
import { FieldProps } from "formik";
import React from "react";

export const InputField = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}: FieldProps): JSX.Element => {
  const errorText = touched[field.name] && errors[field.name];
  //@ts-ignore
  return <Input errorText={errorText} {...field} {...props} />;
};
