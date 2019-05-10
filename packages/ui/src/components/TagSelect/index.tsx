import * as React from "react";
import { AsyncCreatable } from "react-select";
import { FieldProps } from "formik";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" }
];

const filterColors = (inputValue: string) => {
  return options.filter(i =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  );
};

const loadOptions = (inputValue: string, callback: any) => {
  setTimeout(() => {
    callback(filterColors(inputValue));
  }, 1000);
};
export const TagSelect: React.FC<
  FieldProps<any> & {
    prefix: React.ReactNode;
    label?: string;
    style?: any;
    error?: string;
    errorText?: string;
  }
> = ({
  field: { onChange, onBlur: _, ...field },
  form: { touched, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  style,
  error,
  errorText
}) => {
  return (
    <div style={style}>
      <AsyncCreatable
        cacheOptions
        loadOptions={loadOptions}
        defaultOptions
        isMulti
        onChange={(newValue: any) => setFieldValue(field.name, newValue)}
        instanceId="unique"
        isClearable
      />
      {!!error && errorText && touched && (
        <div style={{ color: "red", marginTop: ".5rem" }}>{errorText}</div>
      )}
    </div>
  );
};
