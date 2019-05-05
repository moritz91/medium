import * as React from "react";
import { MyButton, styled, Avatar, Icon, Menu } from "@medium/ui";
import get from "lodash.get";
import NextLink from "next/link";
import { Flex, Link } from "rebass";
import { MeComponent } from "./apollo-components";
import { Router } from "../server/routes";

const Container = styled(Flex)`
  flex: 0 0 auto;
  margin-top: 6.5rem;
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
                  renderOption={({ Anchor, option, optionLink }) => (
                    <NextLink key={option} href={optionLink}>
                      {Anchor}
                    </NextLink>
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
