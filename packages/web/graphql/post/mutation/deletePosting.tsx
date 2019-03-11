import gql from "graphql-tag";

export const deletePostingMutation = gql`
  mutation deletePosting($id: DeletePostingInput!) {
    deletePostingById(id: $id) {
      ok
    }
  }
`;
