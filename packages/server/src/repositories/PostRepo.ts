import { Posting } from "src/entity/Posting";
import { PostingTopic } from "src/entity/PostingTopic";
import { EntityRepository, Repository } from "typeorm";

interface FindByCreatorIdOptions {
  creatorId: string;
  cursor?: string;
  limit: number;
}

interface FindByTopicIdOptions {
  topicIds: string[];
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
      posts: posts.slice(0, limit),
    };
  }

  async findByTopicId({ topicIds, cursor, limit }: FindByTopicIdOptions) {
    const qb = this.createQueryBuilder("p")
      // .orderBy('"createdAt"', "DESC")
      .take(limit + 1);

    if (topicIds) {
      qb.innerJoin(PostingTopic, "pt", "p.id = pt.postingId AND pt.topicId IN (:...topicIds)", {
        topicIds: topicIds,
      });
    }

    if (cursor) {
      qb.where('"createdAt" < :cursor', { cursor });
    }

    const posts = await qb.getMany();

    return {
      hasMore: posts.length === limit + 1,
      posts: posts.slice(0, limit),
    };
  }
}
