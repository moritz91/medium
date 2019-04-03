import * as React from "react";
import { Image } from "rebass";
import styled from "../../theme/styled-components";

const LinkRebass = styled("a")`
  font-size: 20px;
  text-decoration: none;
  font-weight: 600;
  cursor: pointer;
  color: rgb(233, 236, 241);
  &:hover {
    color: #fff;
  }
`;

interface Props {
  id: string;
  name: string;
  pictureUrl: string;
  Link: any;
  getLinkProps: () => any;
}

export const TopicTile: React.FC<Props> = ({
  name,
  pictureUrl,
  getLinkProps,
  Link
}) => {
  const linkProps = getLinkProps();

  return (
    <div
      style={{
        justifyContent: "center",
        flexDirection: "column",
        marginLeft: "15px",
        marginRight: "15px",
        border: "1px solid rgba(0,0,0,.1)",
        width: "280px",
        height: "280px",
        marginBottom: "30px",
        display: "flex"
      }}
    >
      <div
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          alignItems: "center",
          display: "flex",
          flex: "1 1 auto"
        }}
      >
        <Link route={"topic"} params={{ name }}>
          <LinkRebass>{name}</LinkRebass>
        </Link>
      </div>
      <Link {...linkProps}>
        <a>
          <Image src={pictureUrl} m="0rem" />
        </a>
      </Link>
    </div>
  );
};
