import gql from "graphql-tag";

export const deleteCommentMutation = gql`
  mutation deleteComment($id: String!) {
    deleteCommentById(id: $id) {
      ok
    }
  }
`;
