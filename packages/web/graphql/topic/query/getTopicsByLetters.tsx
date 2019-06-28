import gql from "graphql-tag";

export const getTopicsByLettersQuery = gql`
  query GetTopicsByLetters($letters: String!) {
    getTopicsByLetters(letters: $letters) {
      topics {
        id
        name
      }
    }
  }
`;
