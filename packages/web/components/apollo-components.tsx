export type Maybe<T> = T | null;

export type UserInfoFragment = {
  __typename?: "User";

  id: string;

  username: Maybe<string>;

  pictureUrl: string;

  bio: string;
};
