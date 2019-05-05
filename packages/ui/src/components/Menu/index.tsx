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
            zIndex: 11,
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
          {options.map((o, i) => {
            if (o[0] === "divider") {
              return <DropDownDivider key={i} />;
            }
            const Anchor = <MenuLink key={i}>{o[0]}</MenuLink>;
            return renderOption({
              Anchor,
              option: o[0],
              optionLink: o[1]
            });
          })}
        </div>
      ) : null}
    </div>
  );
};
