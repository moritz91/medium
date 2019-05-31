import { createContext } from "react";
import { UserInfoFragment } from "../../../components/apollo-components";
import {
  PostingInfoFragment,
  CommentInfoFragment
} from "../../../components/apollo-components";

export interface PostContextProps {
  title: string;
  creator: UserInfoFragment;
  postingId: string;
}

export interface CreatePostContextProps {
  title: string;
  body: string;
  isSubmitting: boolean;
}

export interface PostsContextProps {
  postings: [PostingInfoFragment];
  comments: [CommentInfoFragment];
  username: string;
  pictureUrl: string;
}

export const PostContext = createContext<PostContextProps>({
  title: "",
  creator: { id: "", username: "", pictureUrl: "", bio: "" },
  postingId: ""
});

export const CreatePostContext = createContext<CreatePostContextProps>({
  title: "",
  body: "",
  isSubmitting: false
});

export const PostsContext = createContext<PostsContextProps>({
  postings: [
    {
      id: "",
      title: "",
      body: "",
      createdAt: "",
      numComments: 0,
      creator: { id: "", username: "", pictureUrl: "", bio: "" },
      tags: [{ id: "", name: "" }]
    }
  ],
  username: "",
  pictureUrl: "",
  comments: [
    {
      id: "",
      text: "",
      createdAt: "",
      creatorId: "",
      creator: { id: "", username: "", pictureUrl: "", bio: "" }
    }
  ]
});
