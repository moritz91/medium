import { FieldProps } from "formik";
import MySelect from "@medium/ui";
import * as React from "react";

export const DropDownField = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}: FieldProps): JSX.Element => {
  const errorText = touched[field.name] && errors[field.name];
  //@ts-ignore
  return <MySelect errorText={errorText} {...field} {...props} />;
};
