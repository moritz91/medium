export type Maybe<T> = T | null;

export interface FindCommentsByIdInput {
  postingId: string;

  cursor?: Maybe<string>;
}

export interface FindPostingsInput {
  offset: number;

  limit: number;
}

export interface FindTopicPostingsInput {
  topicId: string;

  cursor?: Maybe<string>;
}

export interface FindUserPostingsInput {
  creatorId: string;

  cursor?: Maybe<string>;
}

export interface FindTopicsInput {
  offset: number;

  limit: number;
}

export interface CreateCommentInput {
  text: string;

  postingId: string;
}
/** New posting data */
export interface CreatePostingInput {
  title: string;

  body?: Maybe<string>;

  topicId: string;
}
/** New topic data */
export interface CreateTopicInput {
  name: string;

  pictureUrl?: Maybe<string>;
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

  id: string;

  text: string;

  createdAt: DateTime;

  creatorId: string;

  creator: CreateCommentCreator;
};

export type CreateCommentCreator = UserInfoFragment;

export type DeleteCommentVariables = {
  id: string;
};

export type DeleteCommentMutation = {
  __typename?: "Mutation";

  deleteCommentById: Maybe<DeleteCommentDeleteCommentById>;
};

export type DeleteCommentDeleteCommentById = {
  __typename?: "DeleteCommentResponse";

  ok: boolean;
};

export type GetCommentsByIdVariables = {
  input: FindCommentsByIdInput;
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

export type DeletePostingVariables = {
  id: string;
};

export type DeletePostingMutation = {
  __typename?: "Mutation";

  deletePostingById: Maybe<DeletePostingDeletePostingById>;
};

export type DeletePostingDeletePostingById = {
  __typename?: "DeletePostingResponse";

  ok: boolean;
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

  numComments: number;

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

export type GetPostingsByTopicVariables = {
  input: FindTopicPostingsInput;
};

export type GetPostingsByTopicQuery = {
  __typename?: "Query";

  getPostingsByTopic: GetPostingsByTopicGetPostingsByTopic;
};

export type GetPostingsByTopicGetPostingsByTopic = {
  __typename?: "FindPostingsByTopicResponse";

  posts: GetPostingsByTopicPosts[];

  hasMore: boolean;
};

export type GetPostingsByTopicPosts = PostingInfoFragment;

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

export type GetTopicByNameVariables = {
  name: string;
};

export type GetTopicByNameQuery = {
  __typename?: "Query";

  getTopicByName: Maybe<GetTopicByNameGetTopicByName>;
};

export type GetTopicByNameGetTopicByName = {
  __typename?: "Topic";

  id: string;

  name: string;

  numPostings: number;

  description: Maybe<string>;
};

export type GetTopicsVariables = {
  input: FindTopicsInput;
};

export type GetTopicsQuery = {
  __typename?: "Query";

  findTopics: GetTopicsFindTopics;
};

export type GetTopicsFindTopics = {
  __typename?: "FindTopicResponse";

  topics: GetTopicsTopics[];

  hasMore: boolean;
};

export type GetTopicsTopics = {
  __typename?: "Topic";

  id: string;

  name: string;

  pictureUrl: Maybe<string>;
};

export type LogoutVariables = {};

export type LogoutMutation = {
  __typename?: "Mutation";

  logout: boolean;
};

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

  comments: FindUserComments[];
} & UserInfoFragment;

export type FindUserPostings = {
  __typename?: "Posting";

  id: string;

  title: string;

  body: string;

  createdAt: DateTime;

  numComments: number;

  creator: FindUserCreator;
};

export type FindUserCreator = UserInfoFragment;

export type FindUserComments = {
  __typename?: "Comment";

  id: string;

  text: string;

  createdAt: DateTime;

  creator: FindUser_Creator;
};

export type FindUser_Creator = UserInfoFragment;

export type FindUserCommentsVariables = {
  username: string;
};

export type FindUserCommentsQuery = {
  __typename?: "Query";

  findUser: Maybe<FindUserCommentsFindUser>;
};

export type FindUserCommentsFindUser = {
  __typename?: "User";

  id: string;

  comments: FindUserCommentsComments[];
};

export type FindUserCommentsComments = {
  __typename?: "Comment";

  id: string;

  text: string;

  createdAt: DateTime;
};

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

  numComments: number;

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
    numComments
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
        id
        text
        createdAt
        creatorId
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
export const DeleteCommentDocument = gql`
  mutation deleteComment($id: String!) {
    deleteCommentById(id: $id) {
      ok
    }
  }
`;
export class DeleteCommentComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<DeleteCommentMutation, DeleteCommentVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<DeleteCommentMutation, DeleteCommentVariables>
        mutation={DeleteCommentDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type DeleteCommentProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<DeleteCommentMutation, DeleteCommentVariables>
> &
  TChildProps;
export type DeleteCommentMutationFn = ReactApollo.MutationFn<
  DeleteCommentMutation,
  DeleteCommentVariables
>;
export function DeleteCommentHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        DeleteCommentMutation,
        DeleteCommentVariables,
        DeleteCommentProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    DeleteCommentMutation,
    DeleteCommentVariables,
    DeleteCommentProps<TChildProps>
  >(DeleteCommentDocument, operationOptions);
}
export const GetCommentsByIdDocument = gql`
  query getCommentsById($input: FindCommentsByIdInput!) {
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
export const DeletePostingDocument = gql`
  mutation deletePosting($id: String!) {
    deletePostingById(id: $id) {
      ok
    }
  }
`;
export class DeletePostingComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<DeletePostingMutation, DeletePostingVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<DeletePostingMutation, DeletePostingVariables>
        mutation={DeletePostingDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type DeletePostingProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<DeletePostingMutation, DeletePostingVariables>
> &
  TChildProps;
export type DeletePostingMutationFn = ReactApollo.MutationFn<
  DeletePostingMutation,
  DeletePostingVariables
>;
export function DeletePostingHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        DeletePostingMutation,
        DeletePostingVariables,
        DeletePostingProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    DeletePostingMutation,
    DeletePostingVariables,
    DeletePostingProps<TChildProps>
  >(DeletePostingDocument, operationOptions);
}
export const GetPostingByIdDocument = gql`
  query GetPostingById($id: String!) {
    getPostingById(id: $id) {
      title
      body
      createdAt
      numComments
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
export const GetPostingsByTopicDocument = gql`
  query GetPostingsByTopic($input: FindTopicPostingsInput!) {
    getPostingsByTopic(input: $input) {
      posts {
        ...PostingInfo
      }
      hasMore
    }
  }

  ${PostingInfoFragmentDoc}
`;
export class GetPostingsByTopicComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<GetPostingsByTopicQuery, GetPostingsByTopicVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Query<GetPostingsByTopicQuery, GetPostingsByTopicVariables>
        query={GetPostingsByTopicDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type GetPostingsByTopicProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<GetPostingsByTopicQuery, GetPostingsByTopicVariables>
> &
  TChildProps;
export function GetPostingsByTopicHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        GetPostingsByTopicQuery,
        GetPostingsByTopicVariables,
        GetPostingsByTopicProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    GetPostingsByTopicQuery,
    GetPostingsByTopicVariables,
    GetPostingsByTopicProps<TChildProps>
  >(GetPostingsByTopicDocument, operationOptions);
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
export const GetTopicByNameDocument = gql`
  query GetTopicByName($name: String!) {
    getTopicByName(name: $name) {
      id
      name
      numPostings
      description
    }
  }
`;
export class GetTopicByNameComponent extends React.Component<
  Partial<ReactApollo.QueryProps<GetTopicByNameQuery, GetTopicByNameVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<GetTopicByNameQuery, GetTopicByNameVariables>
        query={GetTopicByNameDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type GetTopicByNameProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<GetTopicByNameQuery, GetTopicByNameVariables>
> &
  TChildProps;
export function GetTopicByNameHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        GetTopicByNameQuery,
        GetTopicByNameVariables,
        GetTopicByNameProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    GetTopicByNameQuery,
    GetTopicByNameVariables,
    GetTopicByNameProps<TChildProps>
  >(GetTopicByNameDocument, operationOptions);
}
export const GetTopicsDocument = gql`
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
export class GetTopicsComponent extends React.Component<
  Partial<ReactApollo.QueryProps<GetTopicsQuery, GetTopicsVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<GetTopicsQuery, GetTopicsVariables>
        query={GetTopicsDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type GetTopicsProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<GetTopicsQuery, GetTopicsVariables>
> &
  TChildProps;
export function GetTopicsHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        GetTopicsQuery,
        GetTopicsVariables,
        GetTopicsProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    GetTopicsQuery,
    GetTopicsVariables,
    GetTopicsProps<TChildProps>
  >(GetTopicsDocument, operationOptions);
}
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;
export class LogoutComponent extends React.Component<
  Partial<ReactApollo.MutationProps<LogoutMutation, LogoutVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<LogoutMutation, LogoutVariables>
        mutation={LogoutDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type LogoutProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<LogoutMutation, LogoutVariables>
> &
  TChildProps;
export type LogoutMutationFn = ReactApollo.MutationFn<
  LogoutMutation,
  LogoutVariables
>;
export function LogoutHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        LogoutMutation,
        LogoutVariables,
        LogoutProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    LogoutMutation,
    LogoutVariables,
    LogoutProps<TChildProps>
  >(LogoutDocument, operationOptions);
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
        numComments
        creator {
          ...UserInfo
        }
      }
      comments {
        id
        text
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
export const FindUserCommentsDocument = gql`
  query FindUserComments($username: String!) {
    findUser(username: $username) {
      id
      comments {
        id
        text
        createdAt
      }
    }
  }
`;
export class FindUserCommentsComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<FindUserCommentsQuery, FindUserCommentsVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Query<FindUserCommentsQuery, FindUserCommentsVariables>
        query={FindUserCommentsDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type FindUserCommentsProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<FindUserCommentsQuery, FindUserCommentsVariables>
> &
  TChildProps;
export function FindUserCommentsHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        FindUserCommentsQuery,
        FindUserCommentsVariables,
        FindUserCommentsProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    FindUserCommentsQuery,
    FindUserCommentsVariables,
    FindUserCommentsProps<TChildProps>
  >(FindUserCommentsDocument, operationOptions);
}
