import { createContext } from "react";

export interface TopicContextProps {
  name: string;
  shortCaption: string | null;
  numPostings: string;
  topicId: string;
}

export const TopicContext = createContext<TopicContextProps>({
  name: "",
  shortCaption: "",
  numPostings: "",
  topicId: ""
});
