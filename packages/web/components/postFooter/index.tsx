import * as React from "react";
import styled from "styled-components";

export const CommmentContainer = styled.div`
  width: 100%;
  margin: 1.6rem 0px 1rem 0px;
`;

export const TopRow = styled.div`
  display: grid;
  grid-template-areas: "avatar content actions";
  grid-template-columns: min-content 1fr auto;
  grid-template-rows: auto;
  gap: 8px 8px;
  flex: 1 1 0%;
`;

export const UserAvatar = styled.div`
  display: grid;
  grid-area: avatar / avatar / avatar / avatar;
`;

export const Actions = styled.div`
  display: grid;
  grid-area: actions / actions / actions / actions;
`;

export const Content = styled.div`
  display: grid;
  grid-area: content / content / content / content;
`;

interface Props {
  icon?: any;
  style?: React.CSSProperties | undefined;
  linksLeft: any;
  linksRight: any;
}

export class PostFooter extends React.PureComponent<Props> {
  render(): JSX.Element {
    return (
      <TopRow>
        <UserAvatar />
        <Content />
        <Actions style={{ display: "flex", marginLeft: "auto" }} />
      </TopRow>
    );
  }
}
