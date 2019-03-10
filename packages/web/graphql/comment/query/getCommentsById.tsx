import gql from "graphql-tag";

export const getCommentsByIdQuery = gql`
  query getCommentsById($input: FindCommentsInput!) {
    findCommentsById(input: $input) {
      comments {
        id
        text
        createdAt
        creatorId
        creator {
          ...UserInfo
        }
      }
      hasMore
    }
  }
`;
