import gql from "graphql-tag";
import { PostingInfoFragment } from "../fragments/PostingInfo";

export const getUserPostingsQuery = gql`
  query GetUserPostings($input: FindUserPostingsInput!) {
    findUserPostings(input: $input) {
      posts {
        ...PostingInfo
      }
      hasMore
    }
  }
  ${PostingInfoFragment}
`;
