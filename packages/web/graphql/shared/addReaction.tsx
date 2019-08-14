import gql from "graphql-tag";

export const addReactionMutation = gql`
  mutation addReaction($postingId: String!, $commentId: String!) {
    addReaction(postingId: $postingId, commentId: $commentId)
  }
`;
