import * as React from "react";
import { useState } from "react";
import styled from "styled-components";
import { DropDownDivider } from "../../components/DropDownDivider";

interface Props {
  options: string[];
  renderOption: (data: {
    Anchor: React.ReactElement<any>;
    option: string;
  }) => React.ReactNode;
}

const MenuLink = styled("a")`
  font-size: 14px;
  padding: 5px;
  cursor: pointer;
  &:hover {
    color: #3290d4;
  }
`;

export const Menu: React.FC<Props> = ({
  children,
  options,
  renderOption
}): JSX.Element => {
  const [open, changeOpen] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <div style={{ cursor: "pointer" }} onClick={() => changeOpen(!open)}>
        {children}
      </div>
      {open ? (
        <div
          style={{
            right: 0,
            zIndex: 1,
            position: "absolute",
            background: "#242b38",
            width: 200,
            marginTop: 4,
            boxShadow:
              "0 0.1rem 0.3rem rgba(0,0,0,0.12), 0 0.1rem 0.2rem rgba(0,0,0,0.24)",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <MenuLink key={"12039213"}>View membership</MenuLink>
          <DropDownDivider />
          <MenuLink key={"12039213"}>Stories</MenuLink>
          <MenuLink key={"12039213"}>Series</MenuLink>
          <MenuLink key={"12039213"}>Stats</MenuLink>
          <DropDownDivider />
          <MenuLink key={"12039213"}>Medium Partner Program</MenuLink>
          <MenuLink key={"12039213"}>Medium Partner Program</MenuLink>
          <DropDownDivider />
          <MenuLink key={"12039213"}>Reading List</MenuLink>
          <MenuLink key={"12039213"}>Publications</MenuLink>
          <DropDownDivider />
          <MenuLink key={"12039213"}>Profile</MenuLink>
          <MenuLink key={"12039213"}>Settings</MenuLink>
          <MenuLink key={"12039213"}>Help</MenuLink>
          {options.map(o => {
            const Anchor = <MenuLink key={o}>{o}</MenuLink>;

            return renderOption({ Anchor, option: o });
          })}
        </div>
      ) : null}
    </div>
  );
};
