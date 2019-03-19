import gql from "graphql-tag";
import { UserInfoFragment } from "../../user/fragments/UserInfo";

export const PostingInfoFragment = gql`
  fragment PostingInfo on Posting {
    id
    title
    body
    createdAt
    numComments
    creator {
      ...UserInfo
    }
  }
  ${UserInfoFragment}
`;
