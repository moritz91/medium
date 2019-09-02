import gql from "graphql-tag";
import { UserInfoFragment } from "../../user/fragments/UserInfo";
import { ReplyInfoFragment } from "../fragments/ReplyInfo";

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
