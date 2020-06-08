import { Reply } from "src/entity/Comment";
import { EntityRepository, Repository } from "typeorm";

interface FindByCommentIdOptions {
  commentId: string;
  cursor?: string;
  limit: number;
}

@EntityRepository(Reply)
export class ReplyRepository extends Repository<Reply> {
  async findByCommentId({ commentId, cursor, limit }: FindByCommentIdOptions) {
    const qb = this.createQueryBuilder("c")
      .orderBy('"createdAt"', "DESC")
      .take(limit + 1)
      .where("c.commentId = :commentId", { commentId });

    if (cursor) {
      qb.andWhere('"createdAt" < :cursor', { cursor });
    }

    const replies = await qb.getMany();

    return {
      hasMore: replies.length === limit + 1,
      replies: replies.slice(0, limit),
    };
  }
}
