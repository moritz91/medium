import * as DataLoader from "dataloader";
import { Request, Response } from "express";
import { Posting } from "src/entity/Posting";
import { Tag } from "src/entity/Tag";
import { Topic } from "src/entity/Topic";
import { User } from "src/entity/User";

type DataLoaderType<T> = DataLoader<string, T>;

export interface MyContext {
  req: Request;
  res: Response;
  loaders: {
    users: DataLoaderType<User>;
    postingTags: DataLoaderType<Posting[]>;
    tagPostings: DataLoaderType<Tag[]>;
    topicPostings: DataLoaderType<Topic[]>;
    postingTopics: DataLoaderType<Posting[]>;
    userPostings: DataLoaderType<Posting[]>;
    userTopics: DataLoaderType<Topic[]>;
  };
}
