import gql from "graphql-tag";
import { UserInfoFragment } from "../../user/fragments/UserInfo";
import { TagInfoFragment } from "../../tag/fragments/TagInfo";

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
      tags {
        ...TagInfo
      }
    }
  }
  ${UserInfoFragment}, ${TagInfoFragment}
`;
