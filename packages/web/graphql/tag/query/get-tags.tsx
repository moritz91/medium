import gql from "graphql-tag";
import { TagInfoFragment } from "graphql/tag/fragments/tag-info";

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
