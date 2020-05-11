import gql from "graphql-tag";
import { CommentInfoFragment } from "graphql/comment/fragments/comment-info";
import { UserInfoFragment } from "graphql/user/fragments/user-info";

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
