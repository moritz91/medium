import * as React from "react";
import Select from "react-select";
import { FieldProps } from "formik";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" }
];

export const MySelect: React.SFC<
  FieldProps<any> & {
    prefix: React.ReactNode;
    label?: string;
    style?: any;
    error?: string;
    errorText?: string;
    asyncCreatable?: boolean;
  }
> = ({
  field: { onChange, onBlur: _, ...field },
  form: { touched, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  style,
  error,
  errorText,
  ...props
}) => {
  return (
    <div style={style}>
      <Select
        {...field}
        {...props}
        options={options}
        isClearable
        isSearchable
        onChange={(newValue: any) => setFieldValue(field.name, newValue)}
        instanceId="unique"
      />
      {!!error && errorText && touched && (
        <div style={{ color: "red", marginTop: ".5rem" }}>{errorText}</div>
      )}
    </div>
  );
};
