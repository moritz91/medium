import gql from "graphql-tag";
import { UserInfoFragment } from "../../user/fragments/UserInfo";
import { TagInfoFragment } from "../../tag/fragments/TagInfo";

export const PostingInfoFragment = gql`
  fragment PostingInfo on Posting {
    previewTitle
    previewSubtitle
    previewImage
    title
    body
    createdAt
    readingTime
    allowResponses
    isAuthor
    isBookmark
    hasReacted
    numComments
    numReactions
    creator {
      ...UserInfo
    }
    tags {
      ...TagInfo
    }
  }
  ${UserInfoFragment}, ${TagInfoFragment}
`;
