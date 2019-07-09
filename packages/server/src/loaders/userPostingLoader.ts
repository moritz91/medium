import * as DataLoader from "dataloader";
import { In } from "typeorm";
import { Posting } from "../entity/Posting";
import { UserPosting } from "../entity/UserPosting";

const batchPostings = async (userIds: string[]) => {
  const userPostings = await UserPosting.find({
    join: {
      alias: "userPosting",
      innerJoinAndSelect: {
        posting: "userPosting.posting"
      }
    },
    where: {
      userId: In(userIds)
    }
  });

  const userIdToPostings: { [key: string]: Posting[] } = {};

  userPostings.forEach(pt => {
    if (pt.userId in userIdToPostings) {
      userIdToPostings[pt.userId].push((pt as any).__posting__);
    } else {
      userIdToPostings[pt.userId] = [(pt as any).__posting__];
    }
  });

  return userIds.map(userId => userIdToPostings[userId]);
};

export const userPostingLoader = () => new DataLoader(batchPostings);
