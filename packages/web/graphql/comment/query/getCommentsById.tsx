import gql from "graphql-tag";
import { UserInfoFragment } from "../../user/fragments/UserInfo";
import { ReplyInfoFragment } from "../fragments/ReplyInfo";

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
