import * as DataLoader from "dataloader";
import { PostingTag } from "src/entity/PostingTag";
import { Tag } from "src/entity/Tag";
import { DataLoaderOptions } from "src/types/data-loader";
import { In } from "typeorm";

const batchTags = async (postingIds: string[]) => {
  const postingTags = await PostingTag.find({
    join: {
      alias: "postingTag",
      innerJoinAndSelect: {
        tag: "postingTag.tag",
      },
    },
    where: {
      postingId: In(postingIds),
    },
  });

  const postingIdToTags: { [key: string]: Tag[] } = {};

  /*
  posting tags object: 
  {
    postingId: 1,
    tagId: 1,
    __posting__: { id: 1, name: 'posting1' }
  }
*/

  postingTags.forEach((pt) => {
    if (pt.postingId in postingIdToTags) {
      postingIdToTags[pt.postingId].push((pt as any).__tag__);
    } else {
      postingIdToTags[pt.postingId] = [(pt as any).__tag__];
    }
  });

  return postingIds.map((postingId) => postingIdToTags[postingId]);
};

export default (options?: DataLoaderOptions) =>
  new DataLoader(batchTags, options);
