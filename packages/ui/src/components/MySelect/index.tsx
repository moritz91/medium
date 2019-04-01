import * as React from "react";
import Select from "react-select";
import styled from "styled-components";

const Container = styled.div`
  padding: 0.8rem 1.5rem;
  background-color: #242b38;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

interface Props {
  errorText?: string;
  placeholder?: string;
  style?: React.CSSProperties;
  value?: string;
}

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" }
];

export class MySelect extends React.PureComponent<Props> {
  render(): JSX.Element {
    const { style, errorText, placeholder } = this.props;
    return (
      <div style={style}>
        <Container>
          <Row>
            <Select options={options} placeholder={placeholder} />
          </Row>
        </Container>
        {errorText && (
          <div style={{ color: "red", marginTop: ".5rem" }}>{errorText}</div>
        )}
      </div>
    );
  }
}
