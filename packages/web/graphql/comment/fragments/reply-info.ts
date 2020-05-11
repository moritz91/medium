import gql from "graphql-tag";
import { UserInfoFragment } from "graphql/user/fragments/user-info";

export const ReplyInfoFragment = gql`
  fragment ReplyInfo on Reply {
    id
    text
    creatorId
    numReactions
    hasReacted
    isAuthor
    createdAt
    commentId
    creator {
      ...UserInfo
    }
  }
  ${UserInfoFragment}
`;
