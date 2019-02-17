import gql from "graphql-tag";
import { userInfoFragment } from "../../user/fragments/UserInfo";

export const getPostingByIdQuery = gql`
  query GetPostingById($id: String!) {
    getPostingById(id: $id) {
      title
      body
      createdAt
      ratings {
        date
        value
      }
      creator {
        ...UserInfo
      }
    }
  }
  ${userInfoFragment}
`;
