import gql from "graphql-tag";
import { UserInfoFragment } from "../../user/fragments/UserInfo";
import { ReplyInfoFragment } from "../fragments/ReplyInfo";

export const createReplyMutation = gql`
  mutation createReply($reply: CreateReplyInput!) {
    createReply(reply: $reply) {
      reply {
        ...ReplyInfo
        creator {
          ...UserInfo
        }
      }
    }
  }
  ${UserInfoFragment}, ${ReplyInfoFragment}
`;
