import gql from "graphql-tag";

export const getTagByNameQuery = gql`
  query GetTagByName($name: String!) {
    getTagByName(name: $name) {
      name
    }
  }
`;
