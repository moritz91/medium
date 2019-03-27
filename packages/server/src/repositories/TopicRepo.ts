import { EntityRepository, Repository } from "typeorm";
import { Topic } from "../entity/Topic";

interface FindByTopicIdOptions {
  postingId: string;
  cursor?: string;
  limit: number;
}

@EntityRepository(Topic)
export class TopicRepository extends Repository<Topic> {
  async findByCreatorId({ postingId, cursor, limit }: FindByTopicIdOptions) {
    const qb = this.createQueryBuilder("c")
      .orderBy('"createdAt"', "DESC")
      .take(limit + 1);

    if (postingId) {
      qb.where("c.topicId = :postingId", { postingId });
    }

    if (cursor) {
      qb.where('"createdAt" < :cursor', { cursor });
    }

    const comments = await qb.getMany();

    return {
      hasMore: comments.length === limit + 1,
      comments: comments.slice(0, limit)
    };
  }
}
