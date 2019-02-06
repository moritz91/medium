import gql from "graphql-tag";

export const getPostingsQuery = gql`
  query createPosting($input: CreatePostingInput!) {
    createPosting(input: $input) {
      ...input
    }
  }
`;
