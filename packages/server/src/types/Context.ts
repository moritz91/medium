import * as DataLoader from "dataloader";
import { Request, Response } from "express";
import { User } from "../entity/User";
import { Posting } from "../entity/Posting";
import { Tag } from "../entity/Tag";
import { Topic } from "../entity/Topic";

export interface MyContext {
  req: Request;
  res: Response;
  userLoader: DataLoader<string, User>;
  postingTagLoader: DataLoader<string, Posting[]>;
  tagPostingLoader: DataLoader<string, Tag[]>;
  topicPostingLoader: DataLoader<string, Topic[]>;
  postingTopicLoader: DataLoader<string, Posting[]>;
  userPostingLoader: DataLoader<string, Posting[]>;
}
