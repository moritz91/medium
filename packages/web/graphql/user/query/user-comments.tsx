import gql from "graphql-tag";

export const findUserCommentsQuery = gql`
  query FindUserComments($username: String!) {
    findUserByName(username: $username) {
      id
      comments {
        id
        text
        createdAt
      }
    }
  }
`;
