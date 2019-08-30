import { createContext } from "react";

export interface TopicContextProps {
  name: string;
  shortCaption: string | null;
  topicId: string;
}

export const TopicContext = createContext<TopicContextProps>({
  name: "",
  shortCaption: "",
  topicId: ""
});
