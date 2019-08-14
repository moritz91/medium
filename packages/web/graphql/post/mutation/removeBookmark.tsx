import gql from "graphql-tag";

export const removeBookmarkMutation = gql`
  mutation removeBookmark($postingId: String!) {
    removeBookmark(postingId: $postingId)
  }
`;
