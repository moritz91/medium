import gql from "graphql-tag";

export const removeReactionMutation = gql`
  mutation removeReaction($postingId: String, $commentId: String) {
    removeReaction(postingId: $postingId, commentId: $commentId)
  }
`;
