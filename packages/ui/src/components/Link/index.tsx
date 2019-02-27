import * as React from "react";
import styled from "../../theme/styled-components";

interface Props {
  Link: any;
  getLinkProps?: () => any;
  route?: any;
  params?: any;
}

const LinkWrapper = styled.a`
  cursor: pointer;
`;

export const StyledLink: React.FC<Props> = ({
  Link,
  getLinkProps,
  route,
  params,
  children
}) => (
  <Link {...getLinkProps} {...route} {...params} passHref>
    <LinkWrapper>{children}</LinkWrapper>
  </Link>
);
