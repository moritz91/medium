import * as React from "react";
import { PostsContext } from "../../post/shared/postContext";
import styled from "styled-components";
import { Avatar } from "../../../components/avatar";

const Header = styled.header`
  display: flex;
  flex-shrink: 0;
  margin: 0;
  padding: 0;
  position: relative;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  flex-direction: row;
  @media (min-width: 736px) {
    margin-bottom: 44px;
  }
`;

const AvatarContainer = styled.div`
  flex-grow: 1;
  margin-right: 30px;
`;

const AvatarContainerMedia = styled.div`
  flex-grow: 1;
  margin-right: 30px;
`;

const AvatarContainerTwo = styled.div`
  @media (min-width: 736px) {
    height: 150px;
    width: 150px;
  }

  display: block;
  margin-left: auto;
  margin-right: auto;
`;

const AvatarImageContainer = styled.div`
  background-color: #fafafa;
  border-radius: 50%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  height: 100%;
  width: 100%;

  ::after {
    border: 1px solid rgba(0, 0, 0, 0.0975);
    border-radius: 50%;
    bottom: 0;
    content: "";
    left: 0;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
  }
`;

const UserInfoSection = styled.section`
  -webkit-box-align: stretch;
  -webkit-align-items: stretch;
  -ms-flex-align: stretch;
  align-items: stretch;
  border: 0 solid #000;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-flex-shrink: 0;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  margin: 0;
  padding: 0;
  position: relative;
  -webkit-flex-shrink: 1;
  -ms-flex-negative: 1;
  flex-shrink: 1;
  min-width: 0;
  @media (min-width: 736px) {
    -webkit-flex-basis: 30px;
    -ms-flex-preferred-size: 30px;
    flex-basis: 30px;
    -webkit-box-flex: 2;
    -webkit-flex-grow: 2;
    -ms-flex-positive: 2;
    flex-grow: 2;
  }
`;

// const AvatarImage = styled(Avatar)`
//   height: 100%;
//   left: 0;
//   position: absolute;
//   top: 0;
//   width: 100%;
// `;

const UserInfo = styled.div`
  @media (min-width: 736px) {
    margin-bottom: 20px;
  }
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
`;

const Username = styled.h1`
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 300;
  font-size: 28px;
  line-height: 32px;
  margin: -5px 0 -6px;
`;

export function ProfileHero() {
  const { pictureUrl, username } = React.useContext(PostsContext);

  return (
    <Header>
      <AvatarContainer>
        <AvatarContainerMedia>
          <AvatarContainerTwo>
            <AvatarImageContainer>
              <Avatar m={"0rem"} src={pictureUrl} />
            </AvatarImageContainer>
          </AvatarContainerTwo>
        </AvatarContainerMedia>
      </AvatarContainer>
      <UserInfoSection>
        <UserInfo>
          <Username>{username}</Username>
        </UserInfo>
      </UserInfoSection>
    </Header>
  );
}
