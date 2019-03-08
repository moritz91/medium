import { Request, Response } from "express";
import { User } from "../entity/User";
import * as DataLoader from "dataloader";

export interface MyContext {
  req: Request;
  res: Response;
  userLoader: DataLoader<string, User>;
}
