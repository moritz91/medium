import { createContext } from "react";

export interface ContextProps {
  name: string;
  description: string;
  numPostings: string;
  topicId: string;
}

export const TopicContext = createContext<ContextProps>({
  name: "",
  description: "",
  numPostings: "",
  topicId: ""
});
