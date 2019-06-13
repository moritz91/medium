import * as React from "react";
import styled from "styled-components";

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const StyledFlyout = styled.div`
  padding: 6px;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: absolute;
  z-index: 1000;
  background-color: #fff;
`;

const StyledRow = styled.div`
  position: relative;
  padding: 5px;
`;

export const Flyout = React.forwardRef<HTMLDivElement>(
  ({ children }: any, ref): JSX.Element => (
    <StyledFlyout className={"flyout"} ref={ref}>
      <StyledRow>{children}</StyledRow>
    </StyledFlyout>
  )
);
