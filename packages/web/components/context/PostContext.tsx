import { createContext } from "react";
import { UserInfoFragment, TagInfoFragment } from "../apollo-components";
import { PostingInfoFragment, CommentInfoFragment } from "../apollo-components";

export interface PostContextProps {
  title?: string;
  creator?: UserInfoFragment;
  postingId: string;
}

export interface CreatePostContextProps {
  title: string;
  body: string;
  tags: [TagInfoFragment];
  isSubmitting: boolean;
  isUpdate: boolean;
}

export interface PostsContextProps {
  postings: [PostingInfoFragment];
  comments: [CommentInfoFragment];
  username: string;
  pictureUrl: string;
  createdAt: string;
}

export const PostContext = createContext<PostContextProps>({
  title: "",
  creator: { id: "", username: "", pictureUrl: "", bio: "", createdAt: "" },
  postingId: ""
});

export const CreatePostContext = createContext<CreatePostContextProps>({
  title: "",
  body: "",
  tags: [{ id: "", name: "" }],
  isSubmitting: false,
  isUpdate: false
});

export const PostsContext = createContext<PostsContextProps>({
  postings: [
    {
      id: "",
      title: "",
      body: "",
      createdAt: "",
      numComments: 0,
      creator: { id: "", username: "", pictureUrl: "", bio: "", createdAt: "" },
      tags: [{ id: "", name: "" }],
      previewTitle: "",
      previewSubtitle: "",
      previewImage: ""
    }
  ],
  username: "",
  pictureUrl: "",
  createdAt: "",
  comments: [
    {
      id: "",
      text: "",
      createdAt: "",
      creatorId: "",
      creator: { id: "", username: "", pictureUrl: "", bio: "", createdAt: "" },
      isAuthor: false,
      postingId: ""
    }
  ]
});
