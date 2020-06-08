import { postingTagLoader } from "src/loaders/posting-tag-loader";
import { postingTopicLoader } from "src/loaders/posting-topic-loader";
import { tagPostingLoader } from "src/loaders/tag-posting-loader";
import { topicPostingLoader } from "src/loaders/topic-posting-loader";
import { userLoader } from "src/loaders/user-loader";
import { userPostingLoader } from "src/loaders/user-posting-loader";
import { userTopicLoader } from "src/loaders/user-topic-loader";
import { DataLoaderOptions } from "src/types/data-loader";

export default (options?: DataLoaderOptions) => ({
  userLoader: userLoader(options),
  postingTagLoader: postingTagLoader(options),
  tagPostingLoader: tagPostingLoader(options),
  postingTopicLoader: postingTopicLoader(options),
  topicPostingLoader: topicPostingLoader(options),
  userPostingLoader: userPostingLoader(options),
  userTopicLoader: userTopicLoader(options),
});
