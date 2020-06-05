import { Footer } from "components/common";
import { Navbar } from "components/navigation";
import Head from "next/head";
import React from "react";
import { Link } from "server/routes";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  max-width: 1080px;
  margin: auto;
  display: flex;
  padding: 0 1.6rem;
`;

const InnerWrapper = styled.div`
  margin-top: 75px;
  display: flex;
  flex-direction: column;
`;

type LayoutProps = ReturnType<any> & { title: string };

export const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="static/favicon.ico" />
        <link rel="stylesheet" type="text/css" href="static/nprogress.css" />
      </Head>
      <Navbar />
      <Wrapper data-cy="home-page">
        <InnerWrapper>{children}</InnerWrapper>
      </Wrapper>
      <Footer
        linksLeft={[
          "© " + `${new Date().getFullYear()}` + " Medium, Inc.",
          <Link href={"/tos"}>
            <a>Terms</a>
          </Link>,
          <Link href={"test2"}>
            <a>Privacy</a>
          </Link>,
          <Link href={"test3"}>
            <a>Security</a>
          </Link>,
          <Link href={"test4"}>
            <a>Status</a>
          </Link>,
          <Link href={"test5"}>
            <a>Help</a>
          </Link>,
        ]}
        linksRight={[
          <Link href={"test4"}>
            <a>Contact Medium</a>
          </Link>,
          <Link href={"test5"}>
            <a>Pricing</a>
          </Link>,
          <Link href={"test6"}>
            <a>API</a>
          </Link>,
          <Link href={"test6"}>
            <a>Training</a>
          </Link>,
          <Link href={"test6"}>
            <a>Blog</a>
          </Link>,
          <Link href={"test6"}>
            <a>About</a>
          </Link>,
        ]}
        icon="github"
      />
    </div>
  );
};
