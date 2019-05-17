import gql from "graphql-tag";
import { PostingInfoFragment } from "../../post/fragments/PostingInfo";

export const getTagByNameQuery = gql`
  query GetTagByName($name: String!) {
    getTagByName(name: $name) {
      name
      postings {
        ...PostingInfo
      }
    }
  }
  ${PostingInfoFragment}
`;
