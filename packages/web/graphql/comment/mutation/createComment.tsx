import gql from "graphql-tag";
import { UserInfoFragment } from "../../user/fragments/UserInfo";
import { CommentInfoFragment } from "../../comment/fragments/CommentInfo";

export const createCommentMutation = gql`
  mutation createComment($comment: CreateCommentInput!) {
    createComment(comment: $comment) {
      comment {
        ...CommentInfo
        creator {
          ...UserInfo
        }
      }
    }
  }
  ${UserInfoFragment}, ${CommentInfoFragment}
`;
