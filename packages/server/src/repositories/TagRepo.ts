import { EntityRepository, Repository } from "typeorm";
import { Tag } from "../entity/Tag";

interface FindByPostingIdOptions {
  postingId: string;
  limit: number;
}

@EntityRepository(Tag)
export class TagRepository extends Repository<Tag> {
  async findByPostingId({ postingId, limit }: FindByPostingIdOptions) {
    const qb = this.createQueryBuilder("t")
      .leftJoinAndSelect("t.postings", "posting")
      .orderBy('"name"', "DESC")
      .take(limit + 1);

    if (postingId) {
      qb.where("t.postingId = :postingId", { postingId });
    }

    const tags = await qb.getMany();

    return {
      hasMore: tags.length === limit + 1,
      tags: tags.slice(0, limit)
    };
  }
}
