import gql from "graphql-tag";
import { ReplyInfoFragment } from "graphql/comment/fragments/reply-info";
import { UserInfoFragment } from "graphql/user/fragments/user-info";

export const getRepliesByIdQuery = gql`
  query getRepliesById($input: FindRepliesByIdInput!) {
    findRepliesById(input: $input) {
      replies {
        ...ReplyInfo
        creator {
          ...UserInfo
        }
      }
      hasMore
    }
  }
  ${UserInfoFragment}, ${ReplyInfoFragment}
`;
