import gql from "graphql-tag";

export const deletePostingMutation = gql`
  mutation deletePosting($id: String!) {
    deletePostingById(id: $id) {
      ok
    }
  }
`;
