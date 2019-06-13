import * as React from "react";
import { useState } from "react";
import styled from "styled-components";
import { Divider } from "../../components/divider";
import { Avatar } from "../Avatar";
import { Icon } from "../../components/Icon";

interface Props {
  options: string[][];
  renderOption: (data: {
    Anchor: React.ReactElement<any>;
    option: string;
    optionLink: string;
    key: number;
  }) => React.ReactNode;
  renderUserData?: any;
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
  background: #fff;
  position: absolute;
  width: 280px;
  margin-top: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
`;

const UserDataContainer = styled.div`
  text-align: left;
  width: 100%;
  line-height: 1.4;
`;

const UserDataFlex = styled.div`
  font-weight: 300;
  align-items: center;
  padding: 20px;
  padding-bottom: 10px;
  display: flex;
`;

const UserDataAvatar = styled.div`
  flex: 0 0 auto;
  position: relative;
`;

const UserDataAvatarHalo = styled.div`
  width: calc(100% + 10px);
  height: calc(100% + 10px);
  top: 1.5px;
  left: 0.5px;
  pointer-events: none;
  position: absolute;
`;

const UserDataMeta = styled.div`
  font-size: 14px;
  flex: 1 1 auto;
  padding-left: 15px;
`;

export const Menu: React.FC<Props> = ({
  children,
  options,
  renderOption,
  renderUserData
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
            {renderUserData && (
              <UserDataContainer>
                <UserDataFlex>
                  <UserDataAvatar>
                    <Avatar
                      src={renderUserData.pictureUrl}
                      size={45}
                      borderRadius={"3rem"}
                    />
                    <UserDataAvatarHalo>
                      <Icon
                        name="haloTop"
                        fill="#5C6AC4"
                        size={50}
                        style={{ position: "absolute" }}
                      />
                      <Icon
                        name="haloBottom"
                        fill="#5C6AC4"
                        size={50}
                        style={{ position: "absolute" }}
                      />
                    </UserDataAvatarHalo>
                  </UserDataAvatar>
                  <UserDataMeta>
                    <div style={{ color: "#5C6AC4" }}>Member</div>
                    <div>{renderUserData.username}</div>
                  </UserDataMeta>
                </UserDataFlex>
              </UserDataContainer>
            )}
            {options.map((o, i) => {
              if (o[0] === "divider") {
                return <Divider key={i} />;
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
