import gql from "graphql-tag";
import { userInfoFragment } from "../fragments/UserInfo";

export const findUserQuery = gql`
  query FindUser($username: String!) {
    findUser(username: $username) {
      ...UserInfo
      postings {
        id
        title
        body
        createdAt
        creator {
          ...UserInfo
        }
      }
    }
  }
  ${userInfoFragment}
`;
