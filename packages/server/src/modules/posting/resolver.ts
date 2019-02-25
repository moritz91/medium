import { Resolver, Query, Arg, Authorized, Ctx, Mutation } from "type-graphql";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Posting } from "../../entity/Posting";
import { PostingRepository } from "../../repositories/PostRepo";
import { MyContext } from "../../types/Context";
import { loadCreatorResolver } from "../shared/load-creator-resolver";
import { getByIdResolver } from "../shared/get-by-id-resolver";
import { getConnection } from "typeorm";
import { ApolloError } from "apollo-server-core";
import { createResolver } from "../shared/create-resolver";
import { deleteResolver } from "../shared/delete-resolver";
import {
  DeletePostingInput,
  CreatePostingInput,
  FindPostingsInput,
  FindUserPostingsInput
} from "./Input";
import {
  DeletePostingResponse,
  PostingResponse,
  FindPostingResponse
} from "./Response";

const suffix = "Posting";
const POST_LIMIT = 16;

export const deletePosting = deleteResolver(
  suffix,
  DeletePostingInput,
  Posting,
  DeletePostingResponse
);

export const createPosting = createResolver(
  suffix,
  CreatePostingInput,
  Posting,
  PostingResponse
);

export const loadCreatorForPosting = loadCreatorResolver(Posting);
export const getPostingById = getByIdResolver(suffix, Posting, Posting);

@Resolver(Posting)
export class PostingResolver {
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

  constructor(
    @InjectRepository(PostingRepository)
    private readonly postRepo: PostingRepository
  ) {}

  @Mutation(() => PostingResponse, { name: `findOrCreatePostings` })
  @Authorized()
  async findOrCreatePost(
    @Arg("posting") input: CreatePostingInput,
    @Ctx() { req }: MyContext
  ): Promise<PostingResponse> {
    let value = await this.postRepo.save({
      ...input,
      creatorId: req.session!.userId
    });

    return {
      posting: value
    };
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
