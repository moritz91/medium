import gql from "graphql-tag";

export const TagInfoFragment = gql`
  fragment TagInfo on Tag {
    id
    name
  }
`;
