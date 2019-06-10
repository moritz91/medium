import React, { PureComponent } from "react";
import styled, { css } from "styled-components";
import rem from "../utils/rem";
import { navbarHeight } from "../utils/sizes";
import { headerFont } from "../utils/fonts";
import { mobile } from "../utils/media";
import NavLinks from "./navigationLinks";
import Social from "./social";

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
  transition: background 300ms ease-out;
  color: white;
  padding: 0;
  background-color: #fff;
  -webkit-box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05);
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
  margin: auto;
  max-width: 97rem;
  align-items: center;
  padding: 0 ${rem(20)};
  justify-content: space-between;
  ${StartWrapper}, ${EndWrapper} ${StyledSocial} {
    ${mobile(css`
      display: none;
    `)};
  }
`;

class Navbar extends PureComponent {
  render() {
    return (
      <Wrapper>
        <NormalNavbar>
          <StartWrapper>
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
