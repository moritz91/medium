import gql from "graphql-tag";

export const getTagsByLettersQuery = gql`
  query GetTagsByLetters($letters: String!) {
    getTagsByLetters(letters: $letters) {
      tags {
        name
      }
    }
  }
`;
