import gql from "graphql-tag";
import { PostingInfoFragment } from "graphql/post/fragments/posting-info";

export const getPostingByIdQuery = gql`
  query GetPostingById($id: String!) {
    getPostingById(id: $id) {
      ...PostingInfo
    }
  }
  ${PostingInfoFragment}
`;
