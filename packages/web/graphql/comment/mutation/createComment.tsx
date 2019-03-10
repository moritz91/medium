import gql from "graphql-tag";
import { UserInfoFragment } from "../../user/fragments/UserInfo";

export const createCommentMutation = gql`
  mutation createComment($comment: CreateCommentInput!) {
    createComment(comment: $comment) {
      comment {
        text
        creator {
          ...UserInfo
        }
      }
    }
  }
  ${UserInfoFragment}
`;
