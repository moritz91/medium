import { Icon } from "components/icon";
import React from "react";
import styled from "styled-components";

interface Props {
  checked: boolean;
  onClick: () => void;
}

const Label = styled.label`
  display: flex;
  align-items: flex-start;
  font-size: 12px;
  margin-top: 40px;
`;

const CheckboxSpan = styled.span`
  color: ${(props: any) => props.defaultChecked && "#fff"};
  background: ${(props: any) => props.defaultChecked && "#029e74"};
  border-color: ${(props: any) => props.defaultChecked && "#029e74"};
  display: inline-block;
  border: 1px solid rgba(0, 0, 0, 0.54);
  border-radius: 3px;
  width: 17px;
  height: 17px;
  line-height: 15px;
  vertical-align: text-top;
`;

const CheckMarkSpan = styled.span`
  margin-top: -2px;
  margin-left: -2px;
`;

export const Checkbox: React.FC<Props> = ({ onClick, checked, children }) => {
  return (
    <Label onClick={onClick}>
      <div style={{ marginRight: 10 }}>
        <CheckboxSpan defaultChecked={checked}>
          <CheckMarkSpan>
            <Icon name="checkBox" fill="#fff" />
          </CheckMarkSpan>
        </CheckboxSpan>
      </div>
      <div>{children}</div>
    </Label>
  );
};
