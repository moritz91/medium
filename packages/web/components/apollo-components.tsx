export type Maybe<T> = T | null;

export interface FindCommentsByIdInput {
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

export interface FindRepliesByIdInput {
  commentId: string;

  cursor?: Maybe<string>;
}

export interface FindTagsInput {
  offset: number;

  limit: number;
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
  previewTitle?: Maybe<string>;

  previewSubtitle?: Maybe<string>;

  previewImage?: Maybe<string>;

  title: string;

  body?: Maybe<string>;
}

export interface CreateReplyInput {
  text: string;

  commentId: string;
}
/** New topic data */
export interface CreateTopicInput {
  name: string;

  shortCaption?: Maybe<string>;

  pictureUrl?: Maybe<string>;
}
/** Update topic data */
export interface UpdateTopicInput {
  name?: Maybe<string>;

  shortCaption?: Maybe<string>;

  pictureUrl?: Maybe<string>;
}
/** New posting data */
export interface CreateTagInput {
  name: string;
}

export interface DeleteCommentInput {
  id: string;
}
/** Old posting data */
export interface DeletePostingInput {
  id: string;
}

export interface DeleteReplyInput {
  id: string;
}
/** Old posting data */
export interface DeleteTagInput {
  id: string;
}
/** Old topic data */
export interface DeleteTopicInput {
  id: string;
}

export interface FindCommentsByUsernameInput {
  username: string;

  cursor?: Maybe<string>;
}

export interface FindRepliesByUsernameInput {
  username: string;

  cursor?: Maybe<string>;
}

export interface FindUserTopicsInput {
  creatorId: string;

  cursor?: Maybe<string>;
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

  creator: CreateCommentCreator;
} & CommentInfoFragment;

export type CreateCommentCreator = UserInfoFragment;

export type CreateReplyVariables = {
  reply: CreateReplyInput;
};

export type CreateReplyMutation = {
  __typename?: "Mutation";

  createReply: CreateReplyCreateReply;
};

export type CreateReplyCreateReply = {
  __typename?: "ReplyResponse";

  reply: CreateReplyReply;
};

export type CreateReplyReply = {
  __typename?: "Reply";

  creator: CreateReplyCreator;
} & ReplyInfoFragment;

export type CreateReplyCreator = UserInfoFragment;

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

export type DeleteReplyVariables = {
  id: string;
};

export type DeleteReplyMutation = {
  __typename?: "Mutation";

  deleteReplyById: Maybe<DeleteReplyDeleteReplyById>;
};

export type DeleteReplyDeleteReplyById = {
  __typename?: "DeleteReplyResponse";

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

  isAuthor: Maybe<boolean>;

  numReactions: number;

  hasReacted: boolean;

  replies: Maybe<GetCommentsByIdReplies[]>;

  creator: GetCommentsByIdCreator;
};

export type GetCommentsByIdReplies = ReplyInfoFragment;

export type GetCommentsByIdCreator = UserInfoFragment;

export type GetRepliesByIdVariables = {
  input: FindRepliesByIdInput;
};

export type GetRepliesByIdQuery = {
  __typename?: "Query";

  findRepliesById: GetRepliesByIdFindRepliesById;
};

export type GetRepliesByIdFindRepliesById = {
  __typename?: "FindReplyResponse";

  replies: GetRepliesByIdReplies[];

  hasMore: boolean;
};

export type GetRepliesByIdReplies = {
  __typename?: "Reply";

  creator: GetRepliesByIdCreator;
} & ReplyInfoFragment;

export type GetRepliesByIdCreator = UserInfoFragment;

export type AddBookmarkVariables = {
  postingId: string;
};

export type AddBookmarkMutation = {
  __typename?: "Mutation";

  addBookmark: boolean;
};

export type CreatePostingVariables = {
  posting: CreatePostingInput;
  topicIds: string[];
  tagNames: string[];
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

  creator: CreatePostingCreator;
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
  __typename?: "SuccessResponse";

  ok: boolean;
};

export type RemoveBookmarkVariables = {
  postingId: string;
};

export type RemoveBookmarkMutation = {
  __typename?: "Mutation";

  removeBookmark: boolean;
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

  readingTime: number;

  isAuthor: Maybe<boolean>;

  isBookmark: Maybe<boolean>;

  hasReacted: Maybe<boolean>;

  numComments: number;

  numReactions: number;

  creator: GetPostingByIdCreator;

  tags: Maybe<GetPostingByIdTags[]>;
};

export type GetPostingByIdCreator = UserInfoFragment;

export type GetPostingByIdTags = TagInfoFragment;

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
  cursor: string;
  topicIds: string[];
};

export type GetPostingsByTopicQuery = {
  __typename?: "Query";

  getPostingsByTopic: GetPostingsByTopicGetPostingsByTopic;
};

export type GetPostingsByTopicGetPostingsByTopic = {
  __typename?: "FindPostingResponse";

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

export type AddReactionVariables = {
  postingId?: Maybe<string>;
  commentId?: Maybe<string>;
};

export type AddReactionMutation = {
  __typename?: "Mutation";

  addReaction: boolean;
};

export type RemoveReactionVariables = {
  postingId?: Maybe<string>;
  commentId?: Maybe<string>;
};

export type RemoveReactionMutation = {
  __typename?: "Mutation";

  removeReaction: boolean;
};

export type GetTagsByLettersVariables = {
  letters: string;
};

export type GetTagsByLettersQuery = {
  __typename?: "Query";

  getTagsByLetters: Maybe<GetTagsByLettersGetTagsByLetters>;
};

export type GetTagsByLettersGetTagsByLetters = {
  __typename?: "FindTagResponse";

  tags: GetTagsByLettersTags[];
};

export type GetTagsByLettersTags = {
  __typename?: "Tag";

  name: string;
};

export type GetTagByNameVariables = {
  name: string;
};

export type GetTagByNameQuery = {
  __typename?: "Query";

  getTagByName: Maybe<GetTagByNameGetTagByName>;
};

export type GetTagByNameGetTagByName = {
  __typename?: "Tag";

  name: string;
};

export type GetTagsVariables = {
  input: FindTagsInput;
};

export type GetTagsQuery = {
  __typename?: "Query";

  findTags: GetTagsFindTags;
};

export type GetTagsFindTags = {
  __typename?: "FindTagResponse";

  tags: GetTagsTags[];

  hasMore: boolean;
};

export type GetTagsTags = TagInfoFragment;

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

  shortCaption: Maybe<string>;
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

export type GetTopicsByLettersVariables = {
  letters: string;
};

export type GetTopicsByLettersQuery = {
  __typename?: "Query";

  getTopicsByLetters: Maybe<GetTopicsByLettersGetTopicsByLetters>;
};

export type GetTopicsByLettersGetTopicsByLetters = {
  __typename?: "FindTopicResponse";

  topics: GetTopicsByLettersTopics[];
};

export type GetTopicsByLettersTopics = {
  __typename?: "Topic";

  id: string;

  name: string;
};

export type LogoutVariables = {};

export type LogoutMutation = {
  __typename?: "Mutation";

  logout: boolean;
};

export type MeVariables = {
  withBookmarks: boolean;
};

export type MeQuery = {
  __typename?: "Query";

  me: Maybe<MeMe>;
};

export type MeMe = {
  __typename?: "User";

  bookmarks: Maybe<MeBookmarks[]>;
} & UserInfoFragment;

export type MeBookmarks = PostingInfoFragment;

export type FindUserByNameVariables = {
  username: string;
};

export type FindUserByNameQuery = {
  __typename?: "Query";

  findUserByName: Maybe<FindUserByNameFindUserByName>;
};

export type FindUserByNameFindUserByName = {
  __typename?: "User";

  postings: FindUserByNamePostings[];

  comments: FindUserByNameComments[];
} & UserInfoFragment;

export type FindUserByNamePostings = {
  __typename?: "Posting";

  id: string;

  title: string;

  body: string;

  createdAt: DateTime;

  numComments: number;

  tags: Maybe<FindUserByNameTags[]>;

  creator: FindUserByNameCreator;
};

export type FindUserByNameTags = {
  __typename?: "Tag";

  id: string;

  name: string;
};

export type FindUserByNameCreator = UserInfoFragment;

export type FindUserByNameComments = {
  __typename?: "Comment";

  id: string;

  text: string;

  createdAt: DateTime;

  creator: FindUserByName_Creator;
};

export type FindUserByName_Creator = UserInfoFragment;

export type FindUserCommentsVariables = {
  username: string;
};

export type FindUserCommentsQuery = {
  __typename?: "Query";

  findUserByName: Maybe<FindUserCommentsFindUserByName>;
};

export type FindUserCommentsFindUserByName = {
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

  postingId: string;

  creatorId: string;

  isAuthor: Maybe<boolean>;

  numReactions: number;

  hasReacted: boolean;

  creator: CommentInfoCreator;

  replies: Maybe<CommentInfoReplies[]>;

  createdAt: DateTime;
};

export type CommentInfoCreator = UserInfoFragment;

export type CommentInfoReplies = ReplyInfoFragment;

export type ReplyInfoFragment = {
  __typename?: "Reply";

  id: string;

  text: string;

  creatorId: string;

  numReactions: number;

  hasReacted: boolean;

  isAuthor: Maybe<boolean>;

  createdAt: DateTime;

  commentId: string;

  creator: ReplyInfoCreator;
};

export type ReplyInfoCreator = UserInfoFragment;

export type PostingInfoFragment = {
  __typename?: "Posting";

  id: string;

  previewTitle: Maybe<string>;

  previewSubtitle: Maybe<string>;

  previewImage: Maybe<string>;

  title: string;

  body: string;

  isBookmark: Maybe<boolean>;

  createdAt: DateTime;

  numComments: number;

  readingTime: number;

  creator: PostingInfoCreator;

  tags: Maybe<PostingInfoTags[]>;
};

export type PostingInfoCreator = UserInfoFragment;

export type PostingInfoTags = TagInfoFragment;

export type TagInfoFragment = {
  __typename?: "Tag";

  id: string;

  name: string;
};

export type UserInfoFragment = {
  __typename?: "User";

  id: string;

  username: Maybe<string>;

  pictureUrl: string;

  bio: Maybe<string>;

  createdAt: DateTime;
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
    createdAt
  }
`;

export const ReplyInfoFragmentDoc = gql`
  fragment ReplyInfo on Reply {
    id
    text
    creatorId
    numReactions
    hasReacted
    isAuthor
    createdAt
    commentId
    creator {
      ...UserInfo
    }
  }

  ${UserInfoFragmentDoc}
`;

export const CommentInfoFragmentDoc = gql`
  fragment CommentInfo on Comment {
    id
    text
    postingId
    creatorId
    isAuthor
    numReactions
    hasReacted
    creator {
      ...UserInfo
    }
    replies {
      ...ReplyInfo
    }
    createdAt
  }

  ${UserInfoFragmentDoc}
  ${ReplyInfoFragmentDoc}
`;

export const TagInfoFragmentDoc = gql`
  fragment TagInfo on Tag {
    id
    name
  }
`;

export const PostingInfoFragmentDoc = gql`
  fragment PostingInfo on Posting {
    id
    previewTitle
    previewSubtitle
    previewImage
    title
    body
    isBookmark
    createdAt
    numComments
    readingTime
    creator {
      ...UserInfo
    }
    tags {
      ...TagInfo
    }
  }

  ${UserInfoFragmentDoc}
  ${TagInfoFragmentDoc}
`;

// ====================================================
// Components
// ====================================================

export const CreateCommentDocument = gql`
  mutation createComment($comment: CreateCommentInput!) {
    createComment(comment: $comment) {
      comment {
        ...CommentInfo
        creator {
          ...UserInfo
        }
      }
    }
  }

  ${CommentInfoFragmentDoc}
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
export const CreateReplyDocument = gql`
  mutation createReply($reply: CreateReplyInput!) {
    createReply(reply: $reply) {
      reply {
        ...ReplyInfo
        creator {
          ...UserInfo
        }
      }
    }
  }

  ${ReplyInfoFragmentDoc}
  ${UserInfoFragmentDoc}
`;
export class CreateReplyComponent extends React.Component<
  Partial<ReactApollo.MutationProps<CreateReplyMutation, CreateReplyVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<CreateReplyMutation, CreateReplyVariables>
        mutation={CreateReplyDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type CreateReplyProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<CreateReplyMutation, CreateReplyVariables>
> &
  TChildProps;
export type CreateReplyMutationFn = ReactApollo.MutationFn<
  CreateReplyMutation,
  CreateReplyVariables
>;
export function CreateReplyHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CreateReplyMutation,
        CreateReplyVariables,
        CreateReplyProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    CreateReplyMutation,
    CreateReplyVariables,
    CreateReplyProps<TChildProps>
  >(CreateReplyDocument, operationOptions);
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
export const DeleteReplyDocument = gql`
  mutation deleteReply($id: String!) {
    deleteReplyById(id: $id) {
      ok
    }
  }
`;
export class DeleteReplyComponent extends React.Component<
  Partial<ReactApollo.MutationProps<DeleteReplyMutation, DeleteReplyVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<DeleteReplyMutation, DeleteReplyVariables>
        mutation={DeleteReplyDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type DeleteReplyProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<DeleteReplyMutation, DeleteReplyVariables>
> &
  TChildProps;
export type DeleteReplyMutationFn = ReactApollo.MutationFn<
  DeleteReplyMutation,
  DeleteReplyVariables
>;
export function DeleteReplyHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        DeleteReplyMutation,
        DeleteReplyVariables,
        DeleteReplyProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    DeleteReplyMutation,
    DeleteReplyVariables,
    DeleteReplyProps<TChildProps>
  >(DeleteReplyDocument, operationOptions);
}
export const GetCommentsByIdDocument = gql`
  query getCommentsById($input: FindCommentsByIdInput!) {
    findCommentsById(input: $input) {
      comments {
        id
        text
        createdAt
        creatorId
        isAuthor
        numReactions
        hasReacted
        replies {
          ...ReplyInfo
        }
        creator {
          ...UserInfo
        }
      }
      hasMore
    }
  }

  ${ReplyInfoFragmentDoc}
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
export const GetRepliesByIdDocument = gql`
  query getRepliesById($input: FindRepliesByIdInput!) {
    findRepliesById(input: $input) {
      replies {
        ...ReplyInfo
        creator {
          ...UserInfo
        }
      }
      hasMore
    }
  }

  ${ReplyInfoFragmentDoc}
  ${UserInfoFragmentDoc}
`;
export class GetRepliesByIdComponent extends React.Component<
  Partial<ReactApollo.QueryProps<GetRepliesByIdQuery, GetRepliesByIdVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<GetRepliesByIdQuery, GetRepliesByIdVariables>
        query={GetRepliesByIdDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type GetRepliesByIdProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<GetRepliesByIdQuery, GetRepliesByIdVariables>
> &
  TChildProps;
export function GetRepliesByIdHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        GetRepliesByIdQuery,
        GetRepliesByIdVariables,
        GetRepliesByIdProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    GetRepliesByIdQuery,
    GetRepliesByIdVariables,
    GetRepliesByIdProps<TChildProps>
  >(GetRepliesByIdDocument, operationOptions);
}
export const AddBookmarkDocument = gql`
  mutation addBookmark($postingId: String!) {
    addBookmark(postingId: $postingId)
  }
`;
export class AddBookmarkComponent extends React.Component<
  Partial<ReactApollo.MutationProps<AddBookmarkMutation, AddBookmarkVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<AddBookmarkMutation, AddBookmarkVariables>
        mutation={AddBookmarkDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type AddBookmarkProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<AddBookmarkMutation, AddBookmarkVariables>
> &
  TChildProps;
export type AddBookmarkMutationFn = ReactApollo.MutationFn<
  AddBookmarkMutation,
  AddBookmarkVariables
>;
export function AddBookmarkHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        AddBookmarkMutation,
        AddBookmarkVariables,
        AddBookmarkProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    AddBookmarkMutation,
    AddBookmarkVariables,
    AddBookmarkProps<TChildProps>
  >(AddBookmarkDocument, operationOptions);
}
export const CreatePostingDocument = gql`
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
export const RemoveBookmarkDocument = gql`
  mutation removeBookmark($postingId: String!) {
    removeBookmark(postingId: $postingId)
  }
`;
export class RemoveBookmarkComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<RemoveBookmarkMutation, RemoveBookmarkVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<RemoveBookmarkMutation, RemoveBookmarkVariables>
        mutation={RemoveBookmarkDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type RemoveBookmarkProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<RemoveBookmarkMutation, RemoveBookmarkVariables>
> &
  TChildProps;
export type RemoveBookmarkMutationFn = ReactApollo.MutationFn<
  RemoveBookmarkMutation,
  RemoveBookmarkVariables
>;
export function RemoveBookmarkHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        RemoveBookmarkMutation,
        RemoveBookmarkVariables,
        RemoveBookmarkProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    RemoveBookmarkMutation,
    RemoveBookmarkVariables,
    RemoveBookmarkProps<TChildProps>
  >(RemoveBookmarkDocument, operationOptions);
}
export const GetPostingByIdDocument = gql`
  query GetPostingById($id: String!) {
    getPostingById(id: $id) {
      title
      body
      createdAt
      readingTime
      isAuthor
      isBookmark
      hasReacted
      numComments
      numReactions
      creator {
        ...UserInfo
      }
      tags {
        ...TagInfo
      }
    }
  }

  ${UserInfoFragmentDoc}
  ${TagInfoFragmentDoc}
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
  query GetPostingsByTopic($cursor: String!, $topicIds: [String!]!) {
    getPostingsByTopic(cursor: $cursor, topicIds: $topicIds) {
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
export const AddReactionDocument = gql`
  mutation addReaction($postingId: String, $commentId: String) {
    addReaction(postingId: $postingId, commentId: $commentId)
  }
`;
export class AddReactionComponent extends React.Component<
  Partial<ReactApollo.MutationProps<AddReactionMutation, AddReactionVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<AddReactionMutation, AddReactionVariables>
        mutation={AddReactionDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type AddReactionProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<AddReactionMutation, AddReactionVariables>
> &
  TChildProps;
export type AddReactionMutationFn = ReactApollo.MutationFn<
  AddReactionMutation,
  AddReactionVariables
>;
export function AddReactionHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        AddReactionMutation,
        AddReactionVariables,
        AddReactionProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    AddReactionMutation,
    AddReactionVariables,
    AddReactionProps<TChildProps>
  >(AddReactionDocument, operationOptions);
}
export const RemoveReactionDocument = gql`
  mutation removeReaction($postingId: String, $commentId: String) {
    removeReaction(postingId: $postingId, commentId: $commentId)
  }
`;
export class RemoveReactionComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<RemoveReactionMutation, RemoveReactionVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<RemoveReactionMutation, RemoveReactionVariables>
        mutation={RemoveReactionDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type RemoveReactionProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<RemoveReactionMutation, RemoveReactionVariables>
> &
  TChildProps;
export type RemoveReactionMutationFn = ReactApollo.MutationFn<
  RemoveReactionMutation,
  RemoveReactionVariables
>;
export function RemoveReactionHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        RemoveReactionMutation,
        RemoveReactionVariables,
        RemoveReactionProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    RemoveReactionMutation,
    RemoveReactionVariables,
    RemoveReactionProps<TChildProps>
  >(RemoveReactionDocument, operationOptions);
}
export const GetTagsByLettersDocument = gql`
  query GetTagsByLetters($letters: String!) {
    getTagsByLetters(letters: $letters) {
      tags {
        name
      }
    }
  }
`;
export class GetTagsByLettersComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<GetTagsByLettersQuery, GetTagsByLettersVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Query<GetTagsByLettersQuery, GetTagsByLettersVariables>
        query={GetTagsByLettersDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type GetTagsByLettersProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<GetTagsByLettersQuery, GetTagsByLettersVariables>
> &
  TChildProps;
export function GetTagsByLettersHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        GetTagsByLettersQuery,
        GetTagsByLettersVariables,
        GetTagsByLettersProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    GetTagsByLettersQuery,
    GetTagsByLettersVariables,
    GetTagsByLettersProps<TChildProps>
  >(GetTagsByLettersDocument, operationOptions);
}
export const GetTagByNameDocument = gql`
  query GetTagByName($name: String!) {
    getTagByName(name: $name) {
      name
    }
  }
`;
export class GetTagByNameComponent extends React.Component<
  Partial<ReactApollo.QueryProps<GetTagByNameQuery, GetTagByNameVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<GetTagByNameQuery, GetTagByNameVariables>
        query={GetTagByNameDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type GetTagByNameProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<GetTagByNameQuery, GetTagByNameVariables>
> &
  TChildProps;
export function GetTagByNameHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        GetTagByNameQuery,
        GetTagByNameVariables,
        GetTagByNameProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    GetTagByNameQuery,
    GetTagByNameVariables,
    GetTagByNameProps<TChildProps>
  >(GetTagByNameDocument, operationOptions);
}
export const GetTagsDocument = gql`
  query GetTags($input: FindTagsInput!) {
    findTags(input: $input) {
      tags {
        ...TagInfo
      }
      hasMore
    }
  }

  ${TagInfoFragmentDoc}
`;
export class GetTagsComponent extends React.Component<
  Partial<ReactApollo.QueryProps<GetTagsQuery, GetTagsVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<GetTagsQuery, GetTagsVariables>
        query={GetTagsDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type GetTagsProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<GetTagsQuery, GetTagsVariables>
> &
  TChildProps;
export function GetTagsHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        GetTagsQuery,
        GetTagsVariables,
        GetTagsProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    GetTagsQuery,
    GetTagsVariables,
    GetTagsProps<TChildProps>
  >(GetTagsDocument, operationOptions);
}
export const GetTopicByNameDocument = gql`
  query GetTopicByName($name: String!) {
    getTopicByName(name: $name) {
      id
      name
      shortCaption
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
export const GetTopicsByLettersDocument = gql`
  query GetTopicsByLetters($letters: String!) {
    getTopicsByLetters(letters: $letters) {
      topics {
        id
        name
      }
    }
  }
`;
export class GetTopicsByLettersComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<GetTopicsByLettersQuery, GetTopicsByLettersVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Query<GetTopicsByLettersQuery, GetTopicsByLettersVariables>
        query={GetTopicsByLettersDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type GetTopicsByLettersProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<GetTopicsByLettersQuery, GetTopicsByLettersVariables>
> &
  TChildProps;
export function GetTopicsByLettersHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        GetTopicsByLettersQuery,
        GetTopicsByLettersVariables,
        GetTopicsByLettersProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    GetTopicsByLettersQuery,
    GetTopicsByLettersVariables,
    GetTopicsByLettersProps<TChildProps>
  >(GetTopicsByLettersDocument, operationOptions);
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
  query Me($withBookmarks: Boolean!) {
    me {
      ...UserInfo
      bookmarks @include(if: $withBookmarks) {
        ...PostingInfo
      }
    }
  }

  ${UserInfoFragmentDoc}
  ${PostingInfoFragmentDoc}
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
export const FindUserByNameDocument = gql`
  query FindUserByName($username: String!) {
    findUserByName(username: $username) {
      ...UserInfo
      postings {
        id
        title
        body
        createdAt
        numComments
        tags {
          id
          name
        }
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
export class FindUserByNameComponent extends React.Component<
  Partial<ReactApollo.QueryProps<FindUserByNameQuery, FindUserByNameVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<FindUserByNameQuery, FindUserByNameVariables>
        query={FindUserByNameDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type FindUserByNameProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<FindUserByNameQuery, FindUserByNameVariables>
> &
  TChildProps;
export function FindUserByNameHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        FindUserByNameQuery,
        FindUserByNameVariables,
        FindUserByNameProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    FindUserByNameQuery,
    FindUserByNameVariables,
    FindUserByNameProps<TChildProps>
  >(FindUserByNameDocument, operationOptions);
}
export const FindUserCommentsDocument = gql`
  query FindUserComments($username: String!) {
    findUserByName(username: $username) {
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
