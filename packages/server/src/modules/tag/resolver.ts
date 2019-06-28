import { ApolloError } from "apollo-server-core";
import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Tag } from "../../entity/Tag";
import { TagRepository } from "../../repositories/TagRepo";
import { FindTagsInput } from "./Input";
import { DeleteTagResponse, FindTagResponse } from "./Response";

@Resolver(Tag)
export class TagResolver {
  @InjectRepository(TagRepository)
  private readonly tagRepo: TagRepository;

  @Query(() => FindTagResponse)
  async findTags(@Arg("input")
  {
    offset,
    limit
  }: FindTagsInput): Promise<FindTagResponse> {
    if (limit > 20) {
      throw new ApolloError("max limit of 20");
    }

    const tags = await getConnection()
      .getRepository(Tag)
      .createQueryBuilder("tag")
      .skip(offset)
      .take(limit + 1)
      .getMany();

    return {
      hasMore: tags.length === limit + 1,
      tags: tags.slice(0, limit)
    };
  }

  @Query(() => Tag, {
    nullable: true
  })
  async getTagById(@Arg("id") id: string) {
    return this.tagRepo.findOne(id);
  }

  @Query(() => Tag, {
    nullable: true
  })
  async getTagByName(@Arg("name") name: string) {
    return this.tagRepo.findOne({
      where: {
        name
      }
    });
  }

  @Query(() => FindTagResponse, {
    nullable: true
  })
  async getTagsByLetters(@Arg("letters") letters: string) {
    return this.tagRepo.nameContains({ letters, limit: 5 });
  }

  @Mutation(() => DeleteTagResponse, {
    nullable: true
  })
  @Authorized()
  async deleteTagById(@Arg("id") id: string): Promise<DeleteTagResponse> {
    const value = this.tagRepo.findOne(id);
    if (value) {
      this.tagRepo.delete(id);
      return { ok: true };
    }
    return { ok: false };
  }
}
