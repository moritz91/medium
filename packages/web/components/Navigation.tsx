import React, { PureComponent } from "react";
import styled, { css } from "styled-components";
import rem from "../utils/rem";
import { violetRed } from "../utils/colors";
import { navbarHeight } from "../utils/sizes";
import { headerFont } from "../utils/fonts";
import { mobile } from "../utils/media";
import { Link } from "../server/routes";
import NavLinks from "./NavLinks";
import Social from "./Social";
import Logo from "./Logo";

const Wrapper = styled.nav`
  position: fixed;
  left: 0;
  box-sizing: border-box;
  z-index: 3;
  width: 100%;
  height: ${rem(navbarHeight)};
  font-family: ${headerFont};
  font-size: ${rem(15)};
  font-weight: 500;
  background: ${(props: any) =>
    props.transparent ? "transparent" : violetRed};
  transition: background 300ms ease-out;
  color: white;
  padding: 0;
`;

const StartWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const EndWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
/* stylelint-disable */
const StyledSocial = styled(Social)``;
/* stylelint-enable */

const NormalNavbar = styled.div`
  display: flex;
  align-items: center;
  padding: 0 ${rem(20)};
  justify-content: space-between;
  ${StartWrapper}, ${EndWrapper} ${StyledSocial} {
    ${mobile(css`
      display: none;
    `)};
  }
`;

const LogoLink = styled(Link).attrs({
  unstyled: true,
  href: "/"
})`
  display: inline-block;
  vertical-align: center;
  margin-right: ${rem(35)};
`;

class Navbar extends PureComponent<any> {
  render() {
    return (
      <Wrapper>
        <NormalNavbar>
          <StartWrapper>
            <LogoLink>
              <Logo />
            </LogoLink>
            <NavLinks />
          </StartWrapper>
          <EndWrapper>
            <StyledSocial />
          </EndWrapper>
        </NormalNavbar>
      </Wrapper>
    );
  }
}

export default Navbar;
