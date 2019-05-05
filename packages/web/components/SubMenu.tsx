import * as React from "react";
import { MyButton, Avatar, Icon, Menu } from "@medium/ui";
import get from "lodash.get";
import NextLink from "next/link";
import { Flex, Link } from "rebass";
import { MeComponent } from "./apollo-components";
import { Router } from "../server/routes";
import styled from "styled-components";

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
      <Flex alignItems="center">
        <NextLink passHref href="/posts">
          <Link fontSize={5} color="primary.6">
            Stories
          </Link>
        </NextLink>
      </Flex>

      <MeComponent>
        {({ data, loading }) => {
          if (loading) {
            return null;
          }

          let isLoggedIn = !!get(data, "me", false);

          if (isLoggedIn) {
            return (
              <Flex alignItems="center">
                <MyButton
                  variant="primary"
                  onClick={() => Router.push("/create")}
                >
                  NEW STORY
                </MyButton>
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
                      <NextLink href={optionLink}>{Anchor}</NextLink>
                    </ListOption>
                  )}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      size={32}
                      src={data && data.me ? data.me.pictureUrl : undefined}
                      alt="avatar"
                    />
                    <Icon fill="#333" name="downArrow" />
                  </div>
                </Menu>
              </Flex>
            );
          }

          return (
            <div>
              <a href="http://localhost:4000/auth/github">
                <MyButton variant="primary">Sign in with GitHub</MyButton>
              </a>
            </div>
          );
        }}
      </MeComponent>
    </Container>
  );
};
