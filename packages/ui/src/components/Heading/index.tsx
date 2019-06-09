import * as React from "react";
import styled from "styled-components";

const Header = styled.h2`
  text-transform: uppercase;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  letter-spacing: -0.04px;
  font-size: 15px;
  line-height: 16px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.84);
`;

export const Heading: React.FC = ({ children }): JSX.Element => {
  return <Header>{children}</Header>;
};
