import gql from "graphql-tag";

export const getPostingByIdQuery = gql`
  query GetPostingById($id: String!) {
    getPostingById(id: $id) {
      title
      body
      ratings {
        date
        value
      }
      creator {
        id
        username
        pictureUrl
      }
    }
  }
`;
