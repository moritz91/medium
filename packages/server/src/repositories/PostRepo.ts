import { EntityRepository, Repository } from "typeorm";
import { Posting } from "../entity/Posting";

interface FindByCreatorIdOptions {
  creatorId: string;
  cursor?: string;
  limit: number;
}

interface FindByTopicIdOptions {
  topicId: string;
  cursor?: string;
  limit: number;
}

@EntityRepository(Posting)
export class PostingRepository extends Repository<Posting> {
  async findByCreatorId({ creatorId, cursor, limit }: FindByCreatorIdOptions) {
    const qb = this.createQueryBuilder("p")
      .orderBy('"createdAt"', "DESC")
      .take(limit + 1);

    if (creatorId) {
      qb.where("p.creatorId = :creatorId", { creatorId });
    }

    if (cursor) {
      qb.where('"createdAt" < :cursor', { cursor });
    }

    const posts = await qb.getMany();

    return {
      hasMore: posts.length === limit + 1,
      posts: posts.slice(0, limit)
    };
  }

  async findByTopicId({ topicId, cursor, limit }: FindByTopicIdOptions) {
    const qb = this.createQueryBuilder("p")
      .orderBy('"createdAt"', "DESC")
      .take(limit + 1);

    if (topicId) {
      qb.where("p.topicId = :topicId", { topicId });
    }

    if (cursor) {
      qb.where('"createdAt" < :cursor', { cursor });
    }

    const posts = await qb.getMany();

    return {
      hasMore: posts.length === limit + 1,
      posts: posts.slice(0, limit)
    };
  }
}
