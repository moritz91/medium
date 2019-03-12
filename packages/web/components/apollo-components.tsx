export type Maybe<T> = T | null;

export interface FindCommentsInput {
  postingId: string;

  cursor?: Maybe<string>;
}

export interface FindPostingsInput {
  offset: number;

  limit: number;
}

export interface FindUserPostingsInput {
  creatorId: string;

  cursor?: Maybe<string>;
}

export interface CreateCommentInput {
  text: string;

  postingId: string;
}
/** New posting data */
export interface CreatePostingInput {
  title: string;

  body?: Maybe<string>;
}

/** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
export type DateTime = any;

// ====================================================
// Documents
// ====================================================

export type CreateCommentVariables = {
  comment: CreateCommentInput;
};

export type CreateCommentMutation = {
  __typename?: "Mutation";

  createComment: CreateCommentCreateComment;
};

export type CreateCommentCreateComment = {
  __typename?: "CommentResponse";

  comment: CreateCommentComment;
};

export type CreateCommentComment = {
  __typename?: "Comment";

  text: string;

  creator: CreateCommentCreator;
};

export type CreateCommentCreator = UserInfoFragment;

export type GetCommentsByIdVariables = {
  input: FindCommentsInput;
};

export type GetCommentsByIdQuery = {
  __typename?: "Query";

  findCommentsById: GetCommentsByIdFindCommentsById;
};

export type GetCommentsByIdFindCommentsById = {
  __typename?: "FindCommentResponse";

  comments: GetCommentsByIdComments[];

  hasMore: boolean;
};

export type GetCommentsByIdComments = {
  __typename?: "Comment";

  id: string;

  text: string;

  createdAt: DateTime;

  creatorId: string;

  creator: GetCommentsByIdCreator;
};

export type GetCommentsByIdCreator = UserInfoFragment;

export type CreatePostingVariables = {
  posting: CreatePostingInput;
};

export type CreatePostingMutation = {
  __typename?: "Mutation";

  createPosting: CreatePostingCreatePosting;
};

export type CreatePostingCreatePosting = {
  __typename?: "PostingResponse";

  posting: CreatePostingPosting;
};

export type CreatePostingPosting = {
  __typename?: "Posting";

  id: string;

  title: string;

  body: string;

  ratings: Maybe<CreatePostingRatings[]>;

  creator: CreatePostingCreator;
};

export type CreatePostingRatings = {
  __typename?: "Rate";

  date: DateTime;

  value: number;
};

export type CreatePostingCreator = {
  __typename?: "User";

  id: string;

  username: Maybe<string>;

  pictureUrl: string;
};

export type GetPostingByIdVariables = {
  id: string;
};

export type GetPostingByIdQuery = {
  __typename?: "Query";

  getPostingById: Maybe<GetPostingByIdGetPostingById>;
};

export type GetPostingByIdGetPostingById = {
  __typename?: "Posting";

  title: string;

  body: string;

  createdAt: DateTime;

  comments: GetPostingByIdComments[];

  ratings: Maybe<GetPostingByIdRatings[]>;

  creator: GetPostingById_Creator;
};

export type GetPostingByIdComments = {
  __typename?: "Comment";

  text: string;

  creator: GetPostingByIdCreator;
};

export type GetPostingByIdCreator = UserInfoFragment;

export type GetPostingByIdRatings = {
  __typename?: "Rate";

  date: DateTime;

  value: number;
};

export type GetPostingById_Creator = UserInfoFragment;

export type GetPostingsVariables = {
  input: FindPostingsInput;
};

export type GetPostingsQuery = {
  __typename?: "Query";

  findPostings: GetPostingsFindPostings;
};

export type GetPostingsFindPostings = {
  __typename?: "FindPostingResponse";

  posts: GetPostingsPosts[];

  hasMore: boolean;
};

export type GetPostingsPosts = PostingInfoFragment;

export type GetUserPostingsVariables = {
  input: FindUserPostingsInput;
};

export type GetUserPostingsQuery = {
  __typename?: "Query";

  findUserPostings: GetUserPostingsFindUserPostings;
};

export type GetUserPostingsFindUserPostings = {
  __typename?: "FindPostingResponse";

  posts: GetUserPostingsPosts[];

  hasMore: boolean;
};

export type GetUserPostingsPosts = PostingInfoFragment;

export type MeVariables = {};

export type MeQuery = {
  __typename?: "Query";

  me: Maybe<MeMe>;
};

export type MeMe = UserInfoFragment;

export type FindUserVariables = {
  username: string;
};

export type FindUserQuery = {
  __typename?: "Query";

  findUser: Maybe<FindUserFindUser>;
};

export type FindUserFindUser = {
  __typename?: "User";

  postings: FindUserPostings[];
} & UserInfoFragment;

export type FindUserPostings = {
  __typename?: "Posting";

  id: string;

  title: string;

  body: string;

  createdAt: DateTime;

  creator: FindUserCreator;
};

export type FindUserCreator = UserInfoFragment;

export type CommentInfoFragment = {
  __typename?: "Comment";

  id: string;

  text: string;

  createdAt: DateTime;

  creatorId: string;

  creator: CommentInfoCreator;
};

export type CommentInfoCreator = UserInfoFragment;

export type PostingInfoFragment = {
  __typename?: "Posting";

  id: string;

  title: string;

  body: string;

  createdAt: DateTime;

  creator: PostingInfoCreator;
};

export type PostingInfoCreator = UserInfoFragment;

export type UserInfoFragment = {
  __typename?: "User";

  id: string;

  username: Maybe<string>;

  pictureUrl: string;

  bio: Maybe<string>;
};

import * as ReactApollo from "react-apollo";
import * as React from "react";

import gql from "graphql-tag";

// ====================================================
// Fragments
// ====================================================

export const UserInfoFragmentDoc = gql`
  fragment UserInfo on User {
    id
    username
    pictureUrl
    bio
  }
`;

export const CommentInfoFragmentDoc = gql`
  fragment CommentInfo on Comment {
    id
    text
    createdAt
    creatorId
    creator {
      ...UserInfo
    }
  }

  ${UserInfoFragmentDoc}
`;

export const PostingInfoFragmentDoc = gql`
  fragment PostingInfo on Posting {
    id
    title
    body
    createdAt
    creator {
      ...UserInfo
    }
  }

  ${UserInfoFragmentDoc}
`;

// ====================================================
// Components
// ====================================================

export const CreateCommentDocument = gql`
  mutation createComment($comment: CreateCommentInput!) {
    createComment(comment: $comment) {
      comment {
        text
        creator {
          ...UserInfo
        }
      }
    }
  }

  ${UserInfoFragmentDoc}
`;
export class CreateCommentComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<CreateCommentMutation, CreateCommentVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<CreateCommentMutation, CreateCommentVariables>
        mutation={CreateCommentDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type CreateCommentProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<CreateCommentMutation, CreateCommentVariables>
> &
  TChildProps;
export type CreateCommentMutationFn = ReactApollo.MutationFn<
  CreateCommentMutation,
  CreateCommentVariables
>;
export function CreateCommentHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CreateCommentMutation,
        CreateCommentVariables,
        CreateCommentProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    CreateCommentMutation,
    CreateCommentVariables,
    CreateCommentProps<TChildProps>
  >(CreateCommentDocument, operationOptions);
}
export const GetCommentsByIdDocument = gql`
  query getCommentsById($input: FindCommentsInput!) {
    findCommentsById(input: $input) {
      comments {
        id
        text
        createdAt
        creatorId
        creator {
          ...UserInfo
        }
      }
      hasMore
    }
  }

  ${UserInfoFragmentDoc}
`;
export class GetCommentsByIdComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<GetCommentsByIdQuery, GetCommentsByIdVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Query<GetCommentsByIdQuery, GetCommentsByIdVariables>
        query={GetCommentsByIdDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type GetCommentsByIdProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<GetCommentsByIdQuery, GetCommentsByIdVariables>
> &
  TChildProps;
export function GetCommentsByIdHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        GetCommentsByIdQuery,
        GetCommentsByIdVariables,
        GetCommentsByIdProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    GetCommentsByIdQuery,
    GetCommentsByIdVariables,
    GetCommentsByIdProps<TChildProps>
  >(GetCommentsByIdDocument, operationOptions);
}
export const CreatePostingDocument = gql`
  mutation createPosting($posting: CreatePostingInput!) {
    createPosting(posting: $posting) {
      posting {
        id
        title
        body
        ratings {
          date
          value
        }
        creator {
          id
          username
          pictureUrl
        }
      }
    }
  }
`;
export class CreatePostingComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<CreatePostingMutation, CreatePostingVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<CreatePostingMutation, CreatePostingVariables>
        mutation={CreatePostingDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type CreatePostingProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<CreatePostingMutation, CreatePostingVariables>
> &
  TChildProps;
export type CreatePostingMutationFn = ReactApollo.MutationFn<
  CreatePostingMutation,
  CreatePostingVariables
>;
export function CreatePostingHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CreatePostingMutation,
        CreatePostingVariables,
        CreatePostingProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    CreatePostingMutation,
    CreatePostingVariables,
    CreatePostingProps<TChildProps>
  >(CreatePostingDocument, operationOptions);
}
export const GetPostingByIdDocument = gql`
  query GetPostingById($id: String!) {
    getPostingById(id: $id) {
      title
      body
      createdAt
      comments {
        text
        creator {
          ...UserInfo
        }
      }
      ratings {
        date
        value
      }
      creator {
        ...UserInfo
      }
    }
  }

  ${UserInfoFragmentDoc}
`;
export class GetPostingByIdComponent extends React.Component<
  Partial<ReactApollo.QueryProps<GetPostingByIdQuery, GetPostingByIdVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<GetPostingByIdQuery, GetPostingByIdVariables>
        query={GetPostingByIdDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type GetPostingByIdProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<GetPostingByIdQuery, GetPostingByIdVariables>
> &
  TChildProps;
export function GetPostingByIdHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        GetPostingByIdQuery,
        GetPostingByIdVariables,
        GetPostingByIdProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    GetPostingByIdQuery,
    GetPostingByIdVariables,
    GetPostingByIdProps<TChildProps>
  >(GetPostingByIdDocument, operationOptions);
}
export const GetPostingsDocument = gql`
  query getPostings($input: FindPostingsInput!) {
    findPostings(input: $input) {
      posts {
        ...PostingInfo
      }
      hasMore
    }
  }

  ${PostingInfoFragmentDoc}
`;
export class GetPostingsComponent extends React.Component<
  Partial<ReactApollo.QueryProps<GetPostingsQuery, GetPostingsVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<GetPostingsQuery, GetPostingsVariables>
        query={GetPostingsDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type GetPostingsProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<GetPostingsQuery, GetPostingsVariables>
> &
  TChildProps;
export function GetPostingsHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        GetPostingsQuery,
        GetPostingsVariables,
        GetPostingsProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    GetPostingsQuery,
    GetPostingsVariables,
    GetPostingsProps<TChildProps>
  >(GetPostingsDocument, operationOptions);
}
export const GetUserPostingsDocument = gql`
  query getUserPostings($input: FindUserPostingsInput!) {
    findUserPostings(input: $input) {
      posts {
        ...PostingInfo
      }
      hasMore
    }
  }

  ${PostingInfoFragmentDoc}
`;
export class GetUserPostingsComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<GetUserPostingsQuery, GetUserPostingsVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Query<GetUserPostingsQuery, GetUserPostingsVariables>
        query={GetUserPostingsDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type GetUserPostingsProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<GetUserPostingsQuery, GetUserPostingsVariables>
> &
  TChildProps;
export function GetUserPostingsHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        GetUserPostingsQuery,
        GetUserPostingsVariables,
        GetUserPostingsProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    GetUserPostingsQuery,
    GetUserPostingsVariables,
    GetUserPostingsProps<TChildProps>
  >(GetUserPostingsDocument, operationOptions);
}
export const MeDocument = gql`
  query Me {
    me {
      ...UserInfo
    }
  }

  ${UserInfoFragmentDoc}
`;
export class MeComponent extends React.Component<
  Partial<ReactApollo.QueryProps<MeQuery, MeVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<MeQuery, MeVariables>
        query={MeDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type MeProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<MeQuery, MeVariables>
> &
  TChildProps;
export function MeHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        MeQuery,
        MeVariables,
        MeProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    MeQuery,
    MeVariables,
    MeProps<TChildProps>
  >(MeDocument, operationOptions);
}
export const FindUserDocument = gql`
  query FindUser($username: String!) {
    findUser(username: $username) {
      ...UserInfo
      postings {
        id
        title
        body
        createdAt
        creator {
          ...UserInfo
        }
      }
    }
  }

  ${UserInfoFragmentDoc}
`;
export class FindUserComponent extends React.Component<
  Partial<ReactApollo.QueryProps<FindUserQuery, FindUserVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<FindUserQuery, FindUserVariables>
        query={FindUserDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type FindUserProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<FindUserQuery, FindUserVariables>
> &
  TChildProps;
export function FindUserHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        FindUserQuery,
        FindUserVariables,
        FindUserProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    FindUserQuery,
    FindUserVariables,
    FindUserProps<TChildProps>
  >(FindUserDocument, operationOptions);
}
