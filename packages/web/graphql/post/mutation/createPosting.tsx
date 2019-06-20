import gql from "graphql-tag";

export const createPostingMutation = gql`
  mutation createPosting(
    $posting: CreatePostingInput!
    $topicIds: [String!]!
    $tagNames: [String!]!
  ) {
    createPosting(posting: $posting, topicIds: $topicIds, tagNames: $tagNames) {
      posting {
        id
        title
        body
        creator {
          id
          username
          pictureUrl
        }
      }
    }
  }
`;
