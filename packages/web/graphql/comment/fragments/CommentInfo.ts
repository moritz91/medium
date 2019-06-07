import gql from "graphql-tag";
import { UserInfoFragment } from "../../user/fragments/UserInfo";

export const CommentInfoFragment = gql`
  fragment CommentInfo on Comment {
    id
    text
    postingId
    creatorId
    creator {
      ...UserInfo
    }
    createdAt
  }
  ${UserInfoFragment}
`;
