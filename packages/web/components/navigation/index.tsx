import NavLinks from "components/navigation/navigation-links";
import Social from "components/social";
import { SubMenu } from "components/sub-menu";
import React from "react";
import styled, { css } from "styled-components";
import { useScrollPosition } from "utils/dom-scroll-utils";
import { headerFont } from "utils/fonts";
import { mobile } from "utils/media";

const Wrapper: any = styled.nav`
  visibility: ${(p: any) => (p.show > 50 ? "hidden" : "visible")};
  transition: all 200ms ${(p: any) => (p.show > 50 ? "ease-out" : "ease-in")};
  transform: translate(0, ${(p: any) => (p.show > 50 ? "-100%" : "0%")});
  position: fixed;
  left: 0;
  box-sizing: border-box;
  z-index: 3;
  width: 100%;
  height: 50px;
  font-family: ${headerFont};
  font-size: 1.3rem;
  font-weight: 500;
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
  max-width: 1047px;
  align-items: center;
  justify-content: space-between;
  ${StartWrapper}, ${EndWrapper} ${StyledSocial} {
    ${mobile(css`
      display: none;
    `)};
  }
`;

export const Navbar = () => {
  const show = useScrollPosition();

  return (
    <Wrapper show={show}>
      <NormalNavbar>
        <StartWrapper>
          <NavLinks />
        </StartWrapper>
        <EndWrapper>
          <StyledSocial />
          <SubMenu />
        </EndWrapper>
      </NormalNavbar>
    </Wrapper>
  );
};
