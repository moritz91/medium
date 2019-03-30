import gql from "graphql-tag";
import { PostingInfoFragment } from "../fragments/PostingInfo";

export const getPostingsByTopicQuery = gql`
  query GetPostingsByTopic($input: FindTopicPostingsInput!) {
    getPostingsByTopic(input: $input) {
      posts {
        ...PostingInfo
      }
      hasMore
    }
  }
  ${PostingInfoFragment}
`;
