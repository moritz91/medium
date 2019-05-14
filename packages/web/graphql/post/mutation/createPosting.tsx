import gql from "graphql-tag";

export const createPostingMutation = gql`
  mutation createPosting($posting: CreatePostingInput!) {
    createPosting(posting: $posting) {
      posting {
        id
        title
        body
        creator {
          id
          username
          pictureUrl
        }
      }
    }
  }
`;
