import { createContext } from "react";
import { PostingInfoFragment } from "../../../components/apollo-components";

export interface ContextProps {
  postings: [PostingInfoFragment];
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
  pictureUrl: ""
});
