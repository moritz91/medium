import { Topic } from "src/entity/Topic";
import { EntityRepository, Repository } from "typeorm";

interface FindByTopicIdOptions {
  postingId: string;
  cursor?: string;
  limit: number;
}

interface FindByNameContains {
  letters: string;
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
      comments: comments.slice(0, limit),
    };
  }
  async nameContains({ letters, limit }: FindByNameContains) {
    const qb = this.createQueryBuilder("t")
      .orderBy('"name"', "DESC")
      .take(limit + 1);

    qb.where("t.name ILIKE :name", { name: "%" + letters + "%" });

    const topics = await qb.getMany();

    return {
      hasMore: topics.length === limit + 1,
      topics: topics.slice(0, limit),
    };
  }
}
