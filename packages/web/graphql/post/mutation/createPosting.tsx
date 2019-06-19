import gql from "graphql-tag";

export const createPostingMutation = gql`
  mutation createPosting($posting: CreatePostingInput!, $topicIds: [String!]!) {
    createPosting(posting: $posting, topicIds: $topicIds) {
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
