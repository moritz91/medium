import { Button } from "components/button";
import { Avatar } from "components/common";
import { Icon } from "components/icon";
import { Menu, UserDataAvatarHalo } from "components/menu";
import { useAuth } from "context/auth-context";
import get from "lodash.get";
import React from "react";
import { Flex } from "rebass";
import { Link } from "server/routes";
import styled from "styled-components";

const Container = styled(Flex)`
  flex: 0 0 auto;
`;

const ListOption = styled.li`
  box-sizing: border-box;
  text-align: left;
  width: 100%;
  line-height: 1.4;
  white-space: nowrap;
  font-size: 18px;
  font-weight: 300;
  display: block;
  border: 0px;
  list-style: none;
  padding: 0px;
  pointer-events: auto;
`;

export const SubMenu = (): JSX.Element => {
  const { data } = useAuth();
  let isLoggedIn = !!get(data, "me", false);

  if (isLoggedIn) {
    return (
      <Container justifyContent="space-between">
        <Flex alignItems="center">
          {/* <Button
                  variant="primary"
                  onClick={() => Router.push("/create")}
                >
                  New Story
                </Button> */}
          <Menu
            options={[
              ["New story", "/create"],
              ["Stories", "/stories"],
              ["Series", "/series"],
              ["Stats", "/stats"],
              ["divider", ""],
              ["Medium Partner Program", "/creators"],
              ["divider", ""],
              ["Reading List", "/reading-list"],
              ["Publications", "/publications"],
              ["divider", ""],
              ["Profile", "/profile"],
              ["Settings", "/settings"],
              ["Help", "/help"],
              ["Sign Out", "/logout"],
            ]}
            renderOption={({ Anchor, optionLink, key }) => (
              <ListOption key={key}>
                <Link href={optionLink}>{Anchor}</Link>
              </ListOption>
            )}
            renderUserData={data!.me}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Avatar
                src={data && data.me ? data.me.pictureUrl : undefined}
                size={32}
                borderRadius={"3rem"}
                margin="3.5px"
              />
              <UserDataAvatarHalo>
                <Icon name="haloTop" fill="#5C6AC4" size={37} style={{ position: "absolute" }} />
                <Icon name="haloBottom" fill="#5C6AC4" size={37} style={{ position: "absolute" }} />
              </UserDataAvatarHalo>
              <Button variant="action">
                <Icon fill="#000" name="downArrow" />
              </Button>
            </div>
          </Menu>
        </Flex>
      </Container>
    );
  }

  return (
    <div>
      <a href={"http://" + process.env.NEXT_PUBLIC_BACKEND_URI + "/auth/github"}>
        <Button variant="primary">Login</Button>
      </a>
    </div>
  );
};
