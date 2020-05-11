import UnstyledLink from "next/link";
import styled from "styled-components";
import { lightGrey, red, violetRed } from "utils/colors";
import rem from "utils/rem";

export const StyledLink = styled.a`
  display: inline-block;
  color: inherit;
  cursor: pointer;
  padding: ${rem(2)} ${rem(8)};
  margin: ${rem(-2)} ${rem(-8)};
  @media (min-width: ${1000 / 16}em) {
    border-radius: ${rem(3)};
    &:hover {
      background: ${lightGrey};
    }
  }
`;

export const InlineLink = styled.a.attrs({
  target: "_blank",
  rel: "noopener",
})`
  color: ${(p: any) => (p["data-white"] ? "white" : violetRed)};
  cursor: pointer;
  text-decoration: underline;
  &:hover {
    color: ${(p: any) => (p["data-white"] ? "white" : red)};
  }
`;

export const Link = ({
  children,
  className,
  inline,
  unstyled,
  white,
  ...rest
}: any) => {
  let Child: any = StyledLink;
  if (inline) {
    Child = InlineLink;
  } else if (unstyled) {
    Child = "a";
  }

  let dataAttrs;
  if (white) {
    dataAttrs = { "data-white": white };
  }

  const childComponent = ({
    Child,
    className,
    dataAttrs,
    children,
    ...rest
  }: any): JSX.Element => (
    <Child
      href={rest.href}
      className={className}
      aria-label={rest["aria-label"]}
      {...dataAttrs}
    >
      {children}
    </Child>
  );

  if (["http", "https"].includes(rest.href.split("://")[0])) {
    return childComponent({ Child, className, dataAttrs, children, ...rest });
  }

  return (
    <UnstyledLink {...rest}>
      <>{childComponent({ Child, className, dataAttrs, children, ...rest })};</>
    </UnstyledLink>
  );
};
