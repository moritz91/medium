import gql from "graphql-tag";
import { UserInfoFragment } from "../../user/fragments/UserInfo";

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
        creator {
          ...UserInfo
        }
      }
      hasMore
    }
  }
  ${UserInfoFragment}
`;
