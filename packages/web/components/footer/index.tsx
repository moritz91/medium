import * as React from "react";
import styled from "styled-components";
import { icons } from "../icon/icons";
import { Icon } from "../icon";

const List = styled.ul`
  display: flex;
  list-style: none;
  flex-wrap: wrap;
  margin-bottom: 0;
  margin-top: 0;
  padding-left: 0;
  box-sizing: border-box;
  font-size: 12px;
  color: #586069;
`;

const ListItem = styled.li`
  margin-right: 16px;
  &:last-child {
    margin-right: 0;
  }
`;

export const Container = styled.div`
  display: flex;
  padding-right: 16px;
  padding-left: 16px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  max-width: 1012px;
  padding-bottom: 40px;

  border-color: #eaecef;
  color: #586069;
  justify-content: space-between;
  position: relative;
  margin-top: 40px;
  padding-top: 40px;
`;

interface Props {
  icon?: keyof typeof icons;
  style?: React.CSSProperties | undefined;
  linksLeft: any;
  linksRight: any;
}

export class Footer extends React.PureComponent<Props> {
  render(): JSX.Element {
    const { icon, style, linksLeft, linksRight } = this.props;
    return (
      <footer style={style}>
        <Container>
          <List>
            {linksLeft.map((l: any, k: any) => (
              <ListItem key={k}>{l}</ListItem>
            ))}
          </List>
          {icon && (
            <Icon
              name={icon}
              fill="#c6cbd1"
              style={{ marginRight: "24px", marginLeft: "24px" }}
            />
          )}
          <List>
            {linksRight.map((l: any, k: any) => (
              <ListItem key={k}>{l}</ListItem>
            ))}
          </List>
        </Container>
      </footer>
    );
  }
}
