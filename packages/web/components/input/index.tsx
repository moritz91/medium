import { Icon } from "components/icon";
import { icons } from "components/icon/icons";
import React from "react";
import styled from "styled-components";

const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  letter-spacing: 0;
  font-weight: 300;
  font-style: normal;
  padding: 5px 0 3px 0;
  margin-bottom: 10px;
  border-bottom: 1px solid rgba(0,0,0,.15);
}
`;

export const InputEl = styled.input`
  width: 100%;
  border: none;
  border-radius: 3px;
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
}

export class Input extends React.PureComponent<Props> {
  render(): JSX.Element {
    const { icon, style, errorText, big, ...props } = this.props;
    return (
      <div style={style}>
        <Row>
          {icon && (
            <Icon name={icon} fill="#b7c1c6" style={{ marginRight: ".8rem" }} />
          )}
          <InputEl style={{ fontSize: big ? "2rem" : "16px" }} {...props} />
        </Row>
        {errorText && (
          <div style={{ color: "red", marginTop: ".5rem" }}>{errorText}</div>
        )}
      </div>
    );
  }
}
