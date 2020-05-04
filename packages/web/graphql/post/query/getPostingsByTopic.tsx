import gql from "graphql-tag";
import { PostingInfoFragment } from "../fragments/PostingInfo";

export const getPostingsByTopicQuery = gql`
  query GetPostingsByTopic($cursor: String!, $topicIds: [String!]!) {
    getPostingsByTopic(cursor: $cursor, topicIds: $topicIds) {
      posts {
        id
        ...PostingInfo
      }
      hasMore
    }
  }
  ${PostingInfoFragment}
`;
