import { createContext } from "react";

export interface TopicContextProps {
  name: string;
  shortCaption: string | null;
  description: string;
  numPostings: string;
  topicId: string;
}

export const TopicContext = createContext<TopicContextProps>({
  name: "",
  shortCaption: "",
  description: "",
  numPostings: "",
  topicId: ""
});
