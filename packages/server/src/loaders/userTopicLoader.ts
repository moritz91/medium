import * as DataLoader from "dataloader";
import { Topic } from "src/entity/Topic";
import { UserTopic } from "src/entity/UserTopic";
import { In } from "typeorm";

const batchTopics = async (userIds: string[]) => {
  const userTopics = await UserTopic.find({
    join: {
      alias: "userTopic",
      innerJoinAndSelect: {
        topic: "userTopic.topic",
      },
    },
    where: {
      userId: In(userIds),
    },
    order: { topic: "DESC" },
  });

  const userIdToTopics: { [key: string]: Topic[] } = {};

  userTopics.forEach((ut: any) => {
    if (ut.userId in userIdToTopics) {
      userIdToTopics[ut.userId].push((ut as any).__topic__);
    } else {
      userIdToTopics[ut.userId] = [(ut as any).__topic__];
    }
  });

  return userIds.map((userId) => userIdToTopics[userId]);
};

export const userTopicLoader = () => new DataLoader(batchTopics);
