import React from "react";
import Head from "next/head";
import Navbar from "../navigation";
import { SubMenu } from "../subMenu";
import { Link } from "../../server/routes";
import { Footer } from "../common/Footer";
import styled from "styled-components";
import { NextFunctionComponent } from "next";

const Wrapper = styled.div`
  width: 100%;
  max-width: 1080px;
  margin: auto;
  display: flex;
  flex-direction: column;
  padding: 0 1.6rem;
`;

type Props = ReturnType<any> & { title: string };

export const Layout: NextFunctionComponent<Props> = ({ children, title }) => (
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
        "© " + `${new Date().getFullYear()}` + " Medium, Inc.",
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
