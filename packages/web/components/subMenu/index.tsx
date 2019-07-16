import * as React from "react";
import get from "lodash.get";
import { Flex } from "rebass";
import styled from "styled-components";
import { Router, Link } from "../../server/routes";
import { MeComponent } from "../apollo-components";
import { Button } from "../button";
import { Menu } from "../menu";
import { Avatar } from "../common/Avatar";
import { Icon } from "../icon";

const Container = styled(Flex)`
  flex: 0 0 auto;
  margin-top: 6.5rem;
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
    <Container my="1.5rem" justifyContent="space-between">
      <Flex alignItems="center" fontSize={16}>
        <Link passHref href="/posts">
          <a>Stories</a>
        </Link>
      </Flex>

      <MeComponent variables={{ withBookmarks: false }}>
        {({ data, loading }) => {
          if (loading) {
            return null;
          }

          let isLoggedIn = !!get(data, "me", false);

          if (isLoggedIn) {
            return (
              <Flex alignItems="center">
                <Button
                  variant="primary"
                  onClick={() => Router.push("/create")}
                >
                  New Story
                </Button>
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
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      size={32}
                      src={data && data.me ? data.me.pictureUrl : undefined}
                      alt="avatar"
                    />
                    <Icon fill="rgb(255,255,255)" name="downArrow" />
                  </div>
                </Menu>
              </Flex>
            );
          }

          return (
            <div>
              <a href="http://localhost:4000/auth/github">
                <Button variant="primary">Sign in with GitHub</Button>
              </a>
            </div>
          );
        }}
      </MeComponent>
    </Container>
  );
};
