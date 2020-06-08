import DataLoader from "dataloader";
import { Request, Response } from "express";
import { Posting } from "src/entity/Posting";
import { Tag } from "src/entity/Tag";
import { Topic } from "src/entity/Topic";
import { User } from "src/entity/User";

export interface MyContext {
  req: Request;
  res: Response;
  userLoader: DataLoader<string, User>;
  postingTagLoader: DataLoader<string, Posting[]>;
  tagPostingLoader: DataLoader<string, Tag[]>;
  topicPostingLoader: DataLoader<string, Topic[]>;
  postingTopicLoader: DataLoader<string, Posting[]>;
  userPostingLoader: DataLoader<string, Posting[]>;
  userTopicLoader: DataLoader<string, Topic[]>;
}
