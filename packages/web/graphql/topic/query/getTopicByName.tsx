import gql from "graphql-tag";

export const getTopicByNameQuery = gql`
  query GetTopicByName($name: String!) {
    getTopicByName(name: $name) {
      id
      name
      shortCaption
      numPostings
      description
    }
  }
`;
