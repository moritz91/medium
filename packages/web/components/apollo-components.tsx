export type Maybe<T> = T | null;

/** New posting data */
export interface CreatePostingInput {
  title: string;

  body?: Maybe<string>;
}

/** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
export type DateTime = any;

export type UserInfoFragment = {
  __typename?: "User";

  id: string;

  username: Maybe<string>;

  pictureUrl: string;

  bio: Maybe<string>;
};
