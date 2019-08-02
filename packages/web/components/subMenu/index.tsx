import * as React from "react";
import get from "lodash.get";
import { Flex } from "rebass";
import styled from "styled-components";
import { Link } from "../../server/routes";
import { MeComponent } from "../apollo-components";
import { Button } from "../button";
import { Menu, UserDataAvatarHalo } from "../menu";
import { Avatar } from "../common/Avatar";
import { Icon } from "../icon";

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
  return (
    <Container justifyContent="space-between">
      <MeComponent variables={{ withBookmarks: false }}>
        {({ data, loading }) => {
          if (loading) {
            return null;
          }

          let isLoggedIn = !!get(data, "me", false);

          if (isLoggedIn) {
            return (
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
                    ["Sign Out", "/logout"]
                  ]}
                  renderOption={({ Anchor, optionLink, key }) => (
                    <ListOption key={key}>
                      <Link href={optionLink}>{Anchor}</Link>
                    </ListOption>
                  )}
                  renderUserData={data!.me}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    <Avatar
                      src={data && data.me ? data.me.pictureUrl : undefined}
                      size={32}
                      borderRadius={"3rem"}
                      margin="3.5px"
                    />
                    <UserDataAvatarHalo>
                      <Icon
                        name="haloTop"
                        fill="#5C6AC4"
                        size={37}
                        style={{ position: "absolute" }}
                      />
                      <Icon
                        name="haloBottom"
                        fill="#5C6AC4"
                        size={37}
                        style={{ position: "absolute" }}
                      />
                    </UserDataAvatarHalo>
                    <Button variant="action">
                      <Icon fill="#000" name="downArrow" />
                    </Button>
                  </div>
                </Menu>
              </Flex>
            );
          }

          return (
            <div>
              <a href="http://localhost:4000/auth/github">
                <Button variant="primary">Login</Button>
              </a>
            </div>
          );
        }}
      </MeComponent>
    </Container>
  );
};
