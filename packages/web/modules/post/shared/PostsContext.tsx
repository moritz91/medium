import { createContext } from "react";
import {
  PostingInfoFragment,
  CommentInfoFragment
} from "../../../components/apollo-components";

export interface ContextProps {
  postings: [PostingInfoFragment];
  comments: [CommentInfoFragment];
  username: string;
  pictureUrl: string;
}

export const PostsContext = createContext<ContextProps>({
  postings: [
    {
      id: "",
      title: "",
      body: "",
      createdAt: "",
      numComments: 0,
      creator: { id: "", username: "", pictureUrl: "", bio: "" }
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
