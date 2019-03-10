import { EntityRepository, Repository } from "typeorm";
import { Comment } from "../entity/Comment";

interface FindByPostingIdOptions {
  postingId: string;
  cursor?: string;
  limit: number;
}

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
  async findByPostingId({ postingId, cursor, limit }: FindByPostingIdOptions) {
    const qb = this.createQueryBuilder("c")
      .orderBy('"createdAt"', "DESC")
      .take(limit + 1);

    if (postingId) {
      qb.where("c.postingId = :postingId", { postingId });
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
