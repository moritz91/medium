import gql from "graphql-tag";

export const findUserCommentsQuery = gql`
  query FindUserComments($username: String!) {
    findUser(username: $username) {
      id
      comments {
        id
        text
        createdAt
      }
    }
  }
`;
