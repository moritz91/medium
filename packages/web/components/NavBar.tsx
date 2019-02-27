import { Avatar, Icon, MyButton, styled, Menu } from "@medium/ui";
import get from "lodash.get";
import NextLink from "next/link";
import * as React from "react";
import { Flex, Link } from "rebass";
import { MeComponent } from "../components/apollo-components";

const Container = styled(Flex)`
  flex: 0 0 auto;
`;

export const NavBar = () => {
  return (
    <Container my="1.5rem" justifyContent="space-between">
      <Flex alignItems="center">
        <NextLink passHref href="/">
          <Link fontSize={5} color="primary.1">
            Hello
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
                <NextLink href="/submit">
                  <a>
                    <MyButton variant="primary">NEW CODE REVIEW</MyButton>
                  </a>
                </NextLink>
                <NextLink href="/notifications">
                  <a />
                </NextLink>
                <Menu
                  options={["logout"]}
                  renderOption={({ Anchor }) => (
                    <NextLink key="logout" href="/logout">
                      {Anchor}
                    </NextLink>
                  )}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Avatar size={32} src={data!.me!.pictureUrl} alt="avatar" />
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
