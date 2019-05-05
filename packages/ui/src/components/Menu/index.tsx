import * as React from "react";
import { useState } from "react";
import styled from "styled-components";
import { DropDownDivider } from "../../components/DropDownDivider";

interface Props {
  options: string[][];
  renderOption: (data: {
    Anchor: React.ReactElement<any>;
    option: string;
    optionLink: string;
    key: number;
  }) => React.ReactNode;
  renderUserInfo?: (data: {}) => React.ReactNode;
}

const MenuLink = styled("a")`
  font-size: 14px;
  display: inline-block;
  position: relative;
  padding: 7px 25px;
  cursor: pointer;
  text-align: left;
  width: 100%;
  line-height: 1.4;
  white-space: nowrap;
  user-select: none;
  letter-spacing: 0;
  font-weight: 400;
  font-style: normal;
  text-rendering: optimizeLegibility;
  -webkit-tap-highlight-color: transparent;
  &:hover {
    color: #3290d4;
  }
`;

const MenuContainer = styled.div`
  right: 0px;
  z-index: 11;
  position: absolute;
  background: rgb(36, 43, 56);
  width: 280px;
  margin-top: 4px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 0.1rem 0.3rem,
    rgba(0, 0, 0, 0.24) 0px 0.1rem 0.2rem;
  display: flex;
  flex-direction: column;
  border-radius: 3px;
`;

export const Menu: React.FC<Props> = ({
  children,
  options,
  renderOption,
  renderUserInfo
}): JSX.Element => {
  const [open, changeOpen] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <div style={{ cursor: "pointer" }} onClick={() => changeOpen(!open)}>
        {children}
      </div>
      {open ? (
        <MenuContainer>
          <ul
            style={{
              padding: "0",
              listStyle: "none",
              listStyleImage: "none"
            }}
          >
            {renderUserInfo ? "" : ""}
            {options.map((o, i) => {
              if (o[0] === "divider") {
                return <DropDownDivider key={i} />;
              }
              const Anchor = <MenuLink key={i}>{o[0]}</MenuLink>;
              return renderOption({
                Anchor,
                option: o[0],
                optionLink: o[1],
                key: i
              });
            })}
          </ul>
        </MenuContainer>
      ) : null}
    </div>
  );
};
