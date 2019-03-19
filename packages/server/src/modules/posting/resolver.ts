import {
  Resolver,
  Query,
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  Root,
  Mutation
} from "type-graphql";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Posting } from "../../entity/Posting";
import { PostingRepository } from "../../repositories/PostRepo";
import { MyContext } from "../../types/Context";
import { loadCreatorResolver } from "../shared/load-creator-resolver";
import { getConnection } from "typeorm";
import { ApolloError } from "apollo-server-core";
import { createResolver } from "../shared/create-resolver";
import {
  CreatePostingInput,
  FindPostingsInput,
  FindUserPostingsInput
} from "./Input";
import {
  DeletePostingResponse,
  PostingResponse,
  FindPostingResponse
} from "./Response";
import { User } from "../../entity/User";
import { CommentRepository } from "../../repositories/CommentRepo";

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

  @FieldResolver(() => User)
  creator(@Root() root: any, @Ctx() ctx: MyContext) {
    return ctx.userLoader.load(root.creatorId);
  }

  @FieldResolver()
  numComments(@Root() root: Posting): Promise<number> {
    return this.commentRepo.count({ where: { postingId: root.id } });
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

  @Mutation(() => PostingResponse, { name: `createPostingRepo` })
  @Authorized()
  async createPosting(
    @Arg("posting") input: CreatePostingInput,
    @Ctx() { req }: MyContext
  ): Promise<PostingResponse> {
    let value: Posting = await this.postRepo.save({
      ...input,
      creatorId: req.session!.userId
    });

    return {
      posting: value
    };
  }

  @Query(() => Posting, {
    nullable: true
  })
  async getPostingById(@Arg("id") id: string) {
    return this.postRepo.findOne(id);
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
