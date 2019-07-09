import gql from "graphql-tag";
import { PostingInfoFragment } from "../../post/fragments/PostingInfo";

export const meQuery = gql`
  query Me($withBookmarks: Boolean!) {
    me {
      ...UserInfo
      bookmarks @include(if: $withBookmarks) {
        ...PostingInfo
      }
    }
  }
  ${PostingInfoFragment}
`;
