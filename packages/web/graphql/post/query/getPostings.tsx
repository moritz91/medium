import gql from "graphql-tag";
import { PostingInfoFragment } from "../fragments/PostingInfo";

export const getPostingsQuery = gql`
  query getPostings($input: FindPostingInput!) {
    findPosting(input: $input) {
      posts {
        ...PostingInfo
      }
      hasMore
    }
  }
  ${PostingInfoFragment}
`;
