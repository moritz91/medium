import gql from "graphql-tag";
import { UserInfoFragment } from "../../user/fragments/UserInfo";
import { TagInfoFragment } from "../../tag/fragments/TagInfo";

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
    tags {
      ...TagInfo
    }
  }
  ${UserInfoFragment}, ${TagInfoFragment}
`;
