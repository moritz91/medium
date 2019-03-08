import * as React from "react";
import styled from "styled-components";
import { Icon } from "../Icon";
import { icons } from "../Icon/icons";

const Container = styled.div`
  padding: 0.8rem 1.5rem;
  background-color: #fff;
`;

const MyInput = styled.input`
  padding-left: .1rem;
  border: none;
  font-size: 1.6rem
  font-family: roboto;
  width: 100%;
`;

interface Props extends React.HTMLProps<HTMLInputElement> {
  icon?: keyof typeof icons;
}

export class Input extends React.PureComponent<Props> {
  render() {
    const { icon, style, ...props } = this.props;
    return (
      <Container style={style}>
        {icon && (
          <Icon name={icon} fill="#b7c1c6" style={{ marginRight: ".8rem" }} />
        )}
        <MyInput {...props as any} />
      </Container>
    );
  }
}
