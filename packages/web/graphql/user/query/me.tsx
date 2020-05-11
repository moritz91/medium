import gql from "graphql-tag";
import { PostingInfoFragment } from "graphql/post/fragments/posting-info";

export const meQuery = gql`
  query Me($withBookmarks: Boolean!) {
    me {
      ...UserInfo
      bookmarks @include(if: $withBookmarks) {
        id
        ...PostingInfo
      }
    }
  }
  ${PostingInfoFragment}
`;
