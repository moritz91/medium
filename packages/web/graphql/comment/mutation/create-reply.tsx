import gql from "graphql-tag";
import { ReplyInfoFragment } from "graphql/comment/fragments/reply-info";
import { UserInfoFragment } from "graphql/user/fragments/user-info";

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
