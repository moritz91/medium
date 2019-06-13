import * as React from "react";
import Head from "next/head";
import Navbar from "../navigation";
import { SubMenu } from "../subMenu";
import { Link } from "../../server/routes";
import { Wrapper } from "../wrapper";
import { Footer } from "../footer";

type Props = {
  title: string;
};

const Layout: React.SFC<Props> = ({ children, title }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="icon" href="/static/favicon.ico" />
    </Head>
    <Navbar />
    <Wrapper data-cy="home-page">
      <SubMenu />
      {children}
    </Wrapper>
    <Footer
      linksLeft={[
        "© 2019 Medium, Inc.",
        <Link href={"/tos"}>Terms</Link>,
        <Link href={"test2"}>Privacy</Link>,
        <Link href={"test3"}>Security</Link>,
        <Link href={"test4"}>Status</Link>,
        <Link href={"test5"}>Help</Link>
      ]}
      linksRight={[
        <Link href={"test4"}>Contact Medium</Link>,
        <Link href={"test5"}>Pricing</Link>,
        <Link href={"test6"}>API</Link>,
        <Link href={"test6"}>Training</Link>,
        <Link href={"test6"}>Blog</Link>,
        <Link href={"test6"}>About</Link>
      ]}
      icon="github"
    />
  </div>
);

export default Layout;
