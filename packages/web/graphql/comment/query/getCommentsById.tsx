import gql from "graphql-tag";
import { userInfoFragment } from "../../user/fragments/UserInfo";

export const getCommentsByIdQuery = gql`
  query GetCommentsById($id: String!) {
    getCommentsById(id: $id) {
      text
      creator {
        ...UserInfo
      }
    }
  }
  ${userInfoFragment}
`;
