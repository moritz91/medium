import * as DataLoader from "dataloader";
import { PostingTag } from "../entity/PostingTag";
import { In } from "typeorm";
import { Posting } from "../entity/Posting";

const batchPostings = async (tagIds: string[]) => {
  const postingTags = await PostingTag.find({
    join: {
      alias: "postingTag",
      innerJoinAndSelect: {
        posting: "postingTag.posting"
      }
    },
    where: {
      tagId: In(tagIds)
    }
  });

  const tagIdToPostings: { [key: string]: Posting[] } = {};

  postingTags.forEach(pt => {
    if (pt.tagId in tagIdToPostings) {
      tagIdToPostings[pt.tagId].push((pt as any).__posting__);
    } else {
      tagIdToPostings[pt.tagId] = [(pt as any).__posting__];
    }
  });

  return tagIds.map(tagId => tagIdToPostings[tagId]);
};

export const postingsLoader = () => new DataLoader(batchPostings);
