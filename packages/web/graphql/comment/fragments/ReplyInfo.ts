import gql from "graphql-tag";
import { UserInfoFragment } from "../../user/fragments/UserInfo";

export const ReplyInfoFragment = gql`
  fragment ReplyInfo on Reply {
    id
    text
    creatorId
    isAuthor
    numReactions
    hasReacted
    creator {
      ...UserInfo
    }
    createdAt
  }
  ${UserInfoFragment}
`;
