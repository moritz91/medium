import { createContext } from "react";

export interface ContextProps {
  code?: string | null;
  title: string;
  creator: string;
  path?: string;
  postId: string;
  totalLines?: number;
}

export const PostContext = createContext<ContextProps>({} as any);
