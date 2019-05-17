import gql from "graphql-tag";
import { TagInfoFragment } from "../fragments/TagInfo";

export const getTopicsQuery = gql`
  query GetTags($input: FindTagsInput!) {
    findTags(input: $input) {
      tags {
        ...TagInfo
      }
      hasMore
    }
  }
  ${TagInfoFragment}
`;
