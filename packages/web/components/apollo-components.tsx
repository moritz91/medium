export type Maybe<T> = T | null;

export interface FindPostingsInput {
  offset: number;

  limit: number;
}
/** Old posting data */
export interface DeletePostingInput {
  id: string;
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

export type CreatePostingVariables = {
  posting: CreatePostingInput;
};

export type CreatePostingMutation = {
  __typename?: "Mutation";

  createPosting: CreatePostingCreatePosting;
};

export type CreatePostingCreatePosting = {
  __typename?: "CreatePostingResponse";

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

  ratings: Maybe<GetPostingByIdRatings[]>;

  creator: GetPostingByIdCreator;
};

export type GetPostingByIdRatings = {
  __typename?: "Rate";

  date: DateTime;

  value: number;
};

export type GetPostingByIdCreator = UserInfoFragment;

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

export type MeVariables = {};

export type MeQuery = {
  __typename?: "Query";

  me: Maybe<MeMe>;
};

export type MeMe = UserInfoFragment;

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
