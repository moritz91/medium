import { ApolloError } from "apollo-server-core";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Tag } from "../../entity/Tag";
import { TagRepository } from "../../repositories/TagRepo";
import { MyContext } from "../../types/Context";
import { createResolver } from "../shared/create-resolver";
import { CreateTagInput, FindTagsInput } from "./Input";
import {
  DeleteTagResponse,
  FindTagResponse,
  TagResponse,
  FindTagsByLettersResponse
} from "./Response";

const suffix = "Tag";

export const createTag = createResolver(
  suffix,
  CreateTagInput,
  Tag,
  TagResponse
);

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
    if (limit > 6) {
      throw new ApolloError("max limit of 6");
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

  @Mutation(() => TagResponse, { name: `createTagRepo` })
  @Authorized()
  async createTag(
    @Arg("tag") input: CreateTagInput,
    @Ctx() { req }: MyContext
  ): Promise<TagResponse> {
    let value: Tag = await this.tagRepo.save({
      ...input,
      creatorId: req.session!.userId
    });

    return {
      tag: value
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

  @Query(() => FindTagsByLettersResponse, {
    nullable: true
  })
  async getTagsByLetters(@Arg("letters") letters: string) {
    return this.tagRepo.nameContains({ letters, limit: 10 });
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
