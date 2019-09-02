import gql from "graphql-tag";
import { UserInfoFragment } from "../fragments/UserInfo";

export const findUserByNameQuery = gql`
  query FindUserByName($username: String!) {
    findUserByName(username: $username) {
      ...UserInfo
      postings {
        id
        title
        body
        createdAt
        numComments
        tags {
          id
          name
        }
        creator {
          ...UserInfo
        }
      }
      comments {
        id
        text
        createdAt
        creator {
          ...UserInfo
        }
      }
    }
  }
  ${UserInfoFragment}
`;
