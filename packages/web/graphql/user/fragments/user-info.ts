import gql from "graphql-tag";

export const UserInfoFragment = gql`
  fragment UserInfo on User {
    id
    username
    pictureUrl
    bio
    createdAt
  }
`;
