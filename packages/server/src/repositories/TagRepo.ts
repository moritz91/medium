import { Tag } from "src/entity/Tag";
import { EntityRepository, Repository } from "typeorm";

interface FindByNameContains {
  letters: string;
  limit: number;
}

@EntityRepository(Tag)
export class TagRepository extends Repository<Tag> {
  async nameContains({ letters, limit }: FindByNameContains) {
    const qb = this.createQueryBuilder("t")
      .orderBy('"name"', "DESC")
      .take(limit + 1);

    qb.where("t.name ILIKE :name", { name: "%" + letters + "%" });

    const tags = await qb.getMany();

    return {
      hasMore: tags.length === limit + 1,
      tags: tags.slice(0, limit),
    };
  }
}
