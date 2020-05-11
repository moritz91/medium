import gql from "graphql-tag";
import { PostingInfoFragment } from "graphql/post/fragments/posting-info";

export const getUserPostingsQuery = gql`
  query getUserPostings($input: FindUserPostingsInput!) {
    findUserPostings(input: $input) {
      posts {
        id
        ...PostingInfo
      }
      hasMore
    }
  }
  ${PostingInfoFragment}
`;
