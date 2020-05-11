import gql from "graphql-tag";
import { TagInfoFragment } from "graphql/tag/fragments/tag-info";
import { UserInfoFragment } from "graphql/user/fragments/user-info";

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
