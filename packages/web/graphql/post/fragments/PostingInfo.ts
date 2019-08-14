import gql from "graphql-tag";
import { UserInfoFragment } from "../../user/fragments/UserInfo";
import { TagInfoFragment } from "../../tag/fragments/TagInfo";

export const PostingInfoFragment = gql`
  fragment PostingInfo on Posting {
    id
    previewTitle
    previewSubtitle
    previewImage
    title
    body
    isBookmark
    createdAt
    numComments
    creator {
      ...UserInfo
    }
    tags {
      ...TagInfo
    }
  }
  ${UserInfoFragment}, ${TagInfoFragment}
`;
