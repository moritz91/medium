import gql from "graphql-tag";

export const addBookmarkMutation = gql`
  mutation addBookmark($postingId: String!) {
    addBookmark(postingId: $postingId)
  }
`;
