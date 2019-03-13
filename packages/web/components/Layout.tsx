import * as React from "react";
import Head from "next/head";
import { SubMenu } from "./SubMenu";
import { Wrapper } from "@medium/ui";
import Navbar from "./Navigation";

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
    <Navbar />
    <Wrapper>
      <SubMenu />
      {children}
    </Wrapper>
  </div>
);

export default Layout;
