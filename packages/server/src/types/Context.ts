import * as DataLoader from "dataloader";
import { Request, Response } from "express";
import { User } from "../entity/User";
import { Posting } from "../entity/Posting";
import { Tag } from "src/entity/Tag";

export interface MyContext {
  req: Request;
  res: Response;
  userLoader: DataLoader<string, User>;
  postingsLoader: DataLoader<string, Posting[]>;
  tagLoader: DataLoader<string, Tag[]>;
}
