import gql from "graphql-tag";

export const getTopicsQuery = gql`
  query GetTopics($input: FindTopicsInput!) {
    findTopics(input: $input) {
      topics {
        id
        name
        pictureUrl
      }
      hasMore
    }
  }
`;
