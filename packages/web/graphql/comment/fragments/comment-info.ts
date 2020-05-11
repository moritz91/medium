import gql from "graphql-tag";
import { ReplyInfoFragment } from "graphql/comment/fragments/reply-info";
import { UserInfoFragment } from "graphql/user/fragments/user-info";

export const CommentInfoFragment = gql`
  fragment CommentInfo on Comment {
    id
    text
    postingId
    creatorId
    isAuthor
    numReactions
    hasReacted
    creator {
      ...UserInfo
    }
    replies {
      ...ReplyInfo
    }
    createdAt
  }
  ${UserInfoFragment}, ${ReplyInfoFragment}
`;
