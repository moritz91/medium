import gql from "graphql-tag";
import { UserInfoFragment } from "../../user/fragments/UserInfo";

export const createCommentMutation = gql`
  mutation createComment($comment: CreateCommentInput!) {
    createComment(comment: $comment) {
      comment {
        id
        text
        createdAt
        creatorId
        creator {
          ...UserInfo
        }
      }
    }
  }
  ${UserInfoFragment}
`;
