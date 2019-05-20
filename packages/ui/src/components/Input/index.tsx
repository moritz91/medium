import * as React from "react";
import styled from "styled-components";
import { Icon } from "../Icon";
import { icons } from "../Icon/icons";

const Container = styled.div`
  padding: 0.8rem 1.5rem;
  background-color: #242b38;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const MyInput = styled.input`
  padding-left: 0.1rem;
  border: none;
  width: 100%;
  background-color: #242b38;
  color: rgb(233, 236, 241);
`;

interface Props {
  big?: boolean;
  errorText?: string;
  icon?: keyof typeof icons;
  onChange?: (event: React.FormEvent<HTMLInputElement>) => void | undefined;
  onBlur?: (event: React.FormEvent<HTMLInputElement>) => void | undefined;
  placeholder?: string;
  style?: React.CSSProperties | undefined;
  value?: string;
  ref?: React.RefObject<any>;
}

export class Input extends React.PureComponent<Props> {
  render(): JSX.Element {
    const { icon, style, errorText, big, ref, ...props } = this.props;
    return (
      <div style={style}>
        <Container>
          <Row>
            {icon && (
              <Icon
                name={icon}
                fill="#b7c1c6"
                style={{ marginRight: ".8rem" }}
              />
            )}
            <MyInput
              style={{ fontSize: big ? "2rem" : "1.6rem" }}
              {...props}
              {...ref}
            />
          </Row>
        </Container>
        {errorText && (
          <div style={{ color: "red", marginTop: ".5rem" }}>{errorText}</div>
        )}
      </div>
    );
  }
}
