import * as DataLoader from "dataloader";
import { PostingTopic } from "../entity/PostingTopic";
import { In } from "typeorm";
import { Posting } from "../entity/Posting";

const batchPostings = async (topicIds: string[]) => {
  const postingTopics = await PostingTopic.find({
    join: {
      alias: "postingTopic",
      innerJoinAndSelect: {
        posting: "postingTopic.posting"
      }
    },
    where: {
      topicId: In(topicIds)
    }
  });

  const topicIdToPostings: { [key: string]: Posting[] } = {};

  /*
  posting topics object: 
  {
    postingId: 1,
    topicId: 1,
    __posting__: { id: 1, name: 'posting1' }
  }
*/

  postingTopics.forEach(pt => {
    if (pt.topicId in topicIdToPostings) {
      topicIdToPostings[pt.topicId].push((pt as any).__posting__);
    } else {
      topicIdToPostings[pt.topicId] = [(pt as any).__posting__];
    }
  });

  return topicIds.map(topicId => topicIdToPostings[topicId]);
};

export const postingTopicLoader = () => new DataLoader(batchPostings);
