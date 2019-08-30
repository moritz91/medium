import gql from "graphql-tag";

export const deleteReplyMutation = gql`
  mutation deleteReply($id: String!) {
    deleteReplyById(id: $id) {
      ok
    }
  }
`;
