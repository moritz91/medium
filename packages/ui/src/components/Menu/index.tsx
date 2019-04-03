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
  padding: 7px 25px;
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
            width: 280,
            marginTop: 4,
            boxShadow:
              "0 0.1rem 0.3rem rgba(0,0,0,0.12), 0 0.1rem 0.2rem rgba(0,0,0,0.24)",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <MenuLink key={"12039211"}>View membership</MenuLink>
          <DropDownDivider />
          <MenuLink key={"12039212"}>Stories</MenuLink>
          <MenuLink key={"12039213"}>Series</MenuLink>
          <MenuLink key={"12039214"}>Stats</MenuLink>
          <DropDownDivider />
          <MenuLink key={"12039215"}>Medium Partner Program</MenuLink>
          <DropDownDivider />
          <MenuLink key={"12039217"}>Reading List</MenuLink>
          <MenuLink key={"12039218"}>Publications</MenuLink>
          <DropDownDivider />
          <MenuLink key={"12039219"}>Profile</MenuLink>
          <MenuLink key={"12039220"}>Settings</MenuLink>
          <MenuLink key={"12039221"}>Help</MenuLink>
          {options.map(o => {
            const Anchor = <MenuLink key={o}>{o}</MenuLink>;

            return renderOption({ Anchor, option: o });
          })}
        </div>
      ) : null}
    </div>
  );
};
