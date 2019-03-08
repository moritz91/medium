import gql from "graphql-tag";
import { userInfoFragment } from "../../user/fragments/UserInfo";

export const PostingInfoFragment = gql`
  fragment PostingInfo on Posting {
    id
    title
    body
    createdAt
    creator {
      ...UserInfo
    }
  }
  ${userInfoFragment}
`;
