import gql from "graphql-tag";
import { UserInfoFragment } from "../../user/fragments/UserInfo";

export const getPostingByIdQuery = gql`
  query GetPostingById($id: String!) {
    getPostingById(id: $id) {
      title
      body
      createdAt
      numComments
      comments {
        text
        creator {
          ...UserInfo
        }
      }
      creator {
        ...UserInfo
      }
    }
  }
  ${UserInfoFragment}
`;
