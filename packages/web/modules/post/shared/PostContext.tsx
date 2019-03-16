import { createContext } from "react";

export interface ContextProps {
  title: string;
  creator: string;
  postingId: string;
}

export const PostContext = createContext<ContextProps>({
  title: "",
  creator: "",
  postingId: ""
});
