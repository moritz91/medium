import * as React from "react";
import Head from "next/head";
import { NavBar } from "./NavBar";
import { Wrapper } from "@medium/ui";
import Nav from "./Nav";

type Props = {
  title: string;
};

const Layout: React.SFC<Props> = ({ children, title }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Wrapper>
      <Nav />
      <NavBar />
      {children}
    </Wrapper>
  </div>
);

export default Layout;
