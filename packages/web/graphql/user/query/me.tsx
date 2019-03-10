import gql from "graphql-tag";
import { UserInfoFragment } from "../fragments/UserInfo";

export const meQuery = gql`
  query Me {
    me {
      ...UserInfo
    }
  }
  ${UserInfoFragment}
`;
