import * as DataLoader from "dataloader";
import { Bookmark } from "src/entity/Bookmark";
import { Posting } from "src/entity/Posting";
import { DataLoaderOptions } from "src/types/data-loader";
import { In } from "typeorm";

const batchPostings = async (userIds: string[]) => {
  const userPostings = await Bookmark.find({
    join: {
      alias: "userPosting",
      innerJoinAndSelect: {
        posting: "userPosting.posting",
      },
    },
    where: {
      userId: In(userIds),
    },
    order: { posting: "DESC" },
  });

  const userIdToPostings: { [key: string]: Posting[] } = {};

  userPostings.forEach((pt) => {
    if (pt.userId in userIdToPostings) {
      userIdToPostings[pt.userId].push((pt as any).__posting__);
    } else {
      userIdToPostings[pt.userId] = [(pt as any).__posting__];
    }
  });

  return userIds.map((userId) => userIdToPostings[userId]);
};

export default (options?: DataLoaderOptions) =>
  new DataLoader(batchPostings, options);
