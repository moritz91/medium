import gql from "graphql-tag";
import { PostingInfoFragment } from "../../post/fragments/PostingInfo";

export const getPostingByIdQuery = gql`
  query GetPostingById($id: String!) {
    getPostingById(id: $id) {
      ...PostingInfo
    }
  }
  ${PostingInfoFragment}
`;
