import gql from "graphql-tag";

export const addUserPostingMutation = gql`
  mutation addUserPosting($postingId: String!) {
    addUserPosting(postingId: $postingId)
  }
`;
