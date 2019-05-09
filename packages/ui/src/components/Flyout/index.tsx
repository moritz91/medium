import * as React from "react";
import styled from "styled-components";

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const FlyoutRow = styled(FlexRow)`
  width: 100%;
  button {
    width: 100%;
    justify-content: flex-start;
    border-top: 1px solid #fff;
    border-radius: 0;
    transition: none;
  }
  button:hover {
    background: #fff;
    border-top: 1px solid #fff;
    transition: none;
  }
  &:first-of-type {
    button {
      border-top: 0;
      border-radius: 4px 4px 0 0;
    }
  }
  &:last-of-type {
    button {
      border-radius: 0 0 4px 4px;
    }
  }
`;

export const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
`;

const StyledFlyout = styled(FlexRow)`
  border: 1px solid #fff;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: absolute;
  flex: 0 0 auto;
  right: -25%;
  top: 36px;
  z-index: 1000;
`;

const StyledRow = styled(FlexCol)`
  display: flex;
  align-items: stretch;
  position: relative;
  flex: 1;
`;

export const Flyout = ({ children }: any): JSX.Element => (
  <StyledFlyout className={"flyout"}>
    <StyledRow>{children}</StyledRow>
  </StyledFlyout>
);
