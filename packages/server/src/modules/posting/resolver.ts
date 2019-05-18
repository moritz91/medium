import { ApolloError } from "apollo-server-core";
import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware
} from "type-graphql";
import { getConnection } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Posting } from "../../entity/Posting";
import { User } from "../../entity/User";
import { CommentRepository } from "../../repositories/CommentRepo";
import { PostingRepository } from "../../repositories/PostRepo";
import { MyContext } from "../../types/Context";
import { isAuth } from "../middleware/isAuth";
import { createResolver } from "../shared/create-resolver";
import { loadCreatorResolver } from "../shared/load-creator-resolver";
import {
  CreatePostingInput,
  FindPostingsInput,
  FindTopicPostingsInput,
  FindUserPostingsInput
} from "./Input";
import {
  DeletePostingResponse,
  FindPostingResponse,
  PostingResponse
} from "./Response";
import { PostingTag } from "../../entity/PostingTag";
import { TagRepository } from "../../repositories/TagRepo";

const suffix = "Posting";
const POST_LIMIT = 16;

export const createPosting = createResolver(
  suffix,
  CreatePostingInput,
  Posting,
  PostingResponse
);

export const loadCreatorForPosting = loadCreatorResolver(Posting);

@Resolver(Posting)
export class PostingResolver {
  @InjectRepository(PostingRepository)
  private readonly postRepo: PostingRepository;
  @InjectRepository(CommentRepository)
  private readonly commentRepo: CommentRepository;
  @InjectRepository(TagRepository)
  private readonly tagRepo: TagRepository;

  @FieldResolver(() => User)
  creator(@Root() root: any, @Ctx() ctx: MyContext) {
    return ctx.userLoader.load(root.creatorId);
  }

  @FieldResolver()
  numComments(@Root() root: Posting): Promise<number> {
    return this.commentRepo.count({ where: { postingId: root.id } });
  }

  @Mutation(() => PostingResponse, { name: `createPostingRepo` })
  @UseMiddleware(isAuth)
  async createPostingRepo(
    @Arg("posting") input: CreatePostingInput,
    @Ctx() { req }: MyContext
  ): Promise<PostingResponse> {
    const tag = await this.tagRepo.save({
      name: input.tagName
    });

    const posting = await this.postRepo
      .create({
        ...input,
        creatorId: req.session!.userId
      })
      .save();

    await this.addPostingTag(posting.id, tag.id);

    return {
      posting
    };
  }

  @Mutation(() => DeletePostingResponse, {
    nullable: true
  })
  @Authorized()
  async deletePostingById(
    @Arg("id") id: string
  ): Promise<DeletePostingResponse> {
    const value = this.postRepo.findOne(id);
    if (value) {
      this.postRepo.delete(id);
      return { ok: true };
    }
    return { ok: false };
  }

  @Mutation(() => Boolean)
  async addPostingTag(
    @Arg("postingId", () => String) postingId: string,
    @Arg("tagId", () => String) tagId: string
  ) {
    await PostingTag.create({ postingId, tagId }).save();
    return true;
  }

  @Query(() => Posting, {
    nullable: true
  })
  async getPostingById(@Arg("id") id: string) {
    return this.postRepo.findOne(id);
  }

  @Query(() => FindPostingResponse)
  async findPostings(@Arg("input")
  {
    offset,
    limit
  }: FindPostingsInput): Promise<FindPostingResponse> {
    if (limit > 6) {
      throw new ApolloError("max limit of 6");
    }

    const posts = await getConnection()
      .getRepository(Posting)
      .createQueryBuilder("posting")
      .skip(offset)
      .take(limit + 1)
      .orderBy('"createdAt"', "DESC")
      .getMany();

    return {
      hasMore: posts.length === limit + 1,
      posts: posts.slice(0, limit)
    };
  }

  @Query(() => FindPostingResponse)
  @Authorized()
  async getPostingsByTopic(@Arg("input")
  {
    cursor,
    topicId
  }: FindTopicPostingsInput): Promise<FindPostingResponse> {
    return this.postRepo.findByTopicId({
      cursor,
      limit: POST_LIMIT,
      topicId
    });
  }

  @Query(() => FindPostingResponse)
  @Authorized()
  async findUserPostings(@Arg("input")
  {
    cursor,
    creatorId
  }: FindUserPostingsInput): Promise<FindPostingResponse> {
    return this.postRepo.findByCreatorId({
      cursor,
      limit: POST_LIMIT,
      creatorId
    });
  }
}
