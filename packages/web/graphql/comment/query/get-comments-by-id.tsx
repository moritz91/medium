import gql from "graphql-tag";
import { ReplyInfoFragment } from "graphql/comment/fragments/reply-info";
import { UserInfoFragment } from "graphql/user/fragments/user-info";

export const getCommentsByIdQuery = gql`
  query getCommentsById($input: FindCommentsByIdInput!) {
    findCommentsById(input: $input) {
      comments {
        id
        text
        createdAt
        creatorId
        isAuthor
        numReactions
        hasReacted
        replies {
          ...ReplyInfo
        }
        creator {
          ...UserInfo
        }
      }
      hasMore
    }
  }
  ${UserInfoFragment}, ${ReplyInfoFragment}
`;
