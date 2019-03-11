import * as React from "react";
import { MyButton, styled, Avatar, Icon } from "@medium/ui";
import get from "lodash.get";
import NextLink from "next/link";
import { Flex, Link } from "rebass";
import { MeComponent } from "./apollo-components";
import { CreatePostingModal } from "../modules/shared/CreatePostingModal";

const Container = styled(Flex)`
  flex: 0 0 auto;
  margin-top: 6.5rem;
`;

export const SubMenu = () => {
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
                <CreatePostingModal />
                {/* <Menu
                  options={["logout"]}
                  renderOption={({ Anchor }) => (
                    <NextLink key="logout" href="/logout">
                      {Anchor}
                    </NextLink>
                  )}
                >
              </Menu> */}
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Avatar size={32} src={data!.me!.pictureUrl} alt="avatar" />
                  <Icon fill="#333" name="downArrow" />
                </div>
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
