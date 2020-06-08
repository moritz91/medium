import { DataLoaderOptions } from "src/types/data-loader";
import postingTagLoader from "./posting-tag-loader";
import postingTopicLoader from "./posting-topic-loader";
import tagPostingLoader from "./tag-posting-loader";
import topicPostingLoader from "./topic-posting-loader";
import userLoader from "./user-loader";
import userPostingLoader from "./user-posting-loader";
import userTopicLoader from "./user-topic-loader";

export default (options?: DataLoaderOptions) => ({
  users: userLoader(options),
  postingTags: postingTagLoader(options),
  tagPostings: tagPostingLoader(options),
  postingTopics: postingTopicLoader(options),
  topicPostings: topicPostingLoader(options),
  userPostings: userPostingLoader(options),
  userTopics: userTopicLoader(options),
});
