import * as React from "react";
import Select from "react-select";
import styled from "styled-components";
import { FieldProps } from "formik";

const Container = styled.div`
  padding: 0.8rem 1.5rem;
  background-color: #242b38;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

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
      <Container>
        <Row>
          <Select
            {...field}
            {...props}
            options={options}
            multi={true}
            isClearable
            isSearchable
            onChange={(newValue: any) => setFieldValue(field.name, newValue)}
          />
        </Row>
      </Container>
      {!!error && errorText && touched && (
        <div style={{ color: "red", marginTop: ".5rem" }}>{errorText}</div>
      )}
    </div>
  );
};
