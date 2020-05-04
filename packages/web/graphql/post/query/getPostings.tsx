import gql from "graphql-tag";
import { PostingInfoFragment } from "../fragments/PostingInfo";

export const getPostingsQuery = gql`
  query getPostings($input: FindPostingsInput!) {
    findPostings(input: $input) {
      posts {
        id
        ...PostingInfo
      }
      hasMore
    }
  }
  ${PostingInfoFragment}
`;
