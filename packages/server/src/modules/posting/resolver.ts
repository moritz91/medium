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
import { loadCreatorResolver } from "../shared/load-creator-resolver";
import {
  CreatePostingInput,
  FindPostingsInput,
  FindUserPostingsInput
} from "./Input";
import { FindPostingResponse, PostingResponse } from "./Response";
import { PostingTag } from "../../entity/PostingTag";
import { TagRepository } from "../../repositories/TagRepo";
import { PostingTopic } from "../../entity/PostingTopic";
import { SuccessResponse } from "../shared/Response";
import { UserPosting } from "../../entity/UserPosting";

const POST_LIMIT = 16;

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

  @Mutation(() => PostingResponse, { name: `createPosting` })
  @UseMiddleware(isAuth)
  async createPostingRepo(
    @Arg("posting") input: CreatePostingInput,
    @Arg("topicIds", () => [String]) topicIds: string[],
    @Arg("tagNames", () => [String]) tagNames: string[],
    @Ctx() { req }: MyContext
  ): Promise<PostingResponse> {
    const posting = await this.postRepo
      .create({
        ...input,
        creatorId: req.session!.userId
      })
      .save();

    tagNames.map(async tagName => {
      let tag = await this.tagRepo.findOne({
        where: {
          name: tagName
        }
      });
      if (!tag) {
        tag = await this.tagRepo
          .create({
            name: tagName
          })
          .save();
      }
      await this.addPostingTag(posting.id, tag.id);
    });

    if (topicIds) {
      topicIds.map(async (topicId: string) => {
        await this.addPostingTopic(posting.id, topicId);
      });
    }

    return {
      posting
    };
  }

  @Mutation(() => SuccessResponse, {
    nullable: true
  })
  @Authorized()
  async deletePostingById(@Arg("id") id: string): Promise<SuccessResponse> {
    const value = this.postRepo.findOne(id);
    if (value) {
      this.postRepo.delete(id);
      return { ok: true };
    }
    return { ok: false };
  }

  @Mutation(() => Boolean)
  @Authorized()
  async addPostingTag(
    @Arg("postingId", () => String) postingId: string,
    @Arg("tagId", () => String) tagId: string
  ) {
    await PostingTag.create({ postingId, tagId }).save();
    return true;
  }

  @Mutation(() => Boolean)
  @Authorized()
  async addPostingTopic(
    @Arg("postingId", () => String) postingId: string,
    @Arg("topicId", () => String) topicId: string
  ) {
    await PostingTopic.create({ postingId, topicId }).save();
    return true;
  }

  @Mutation(() => Boolean)
  @Authorized()
  async addUserPosting(
    @Arg("postingId", () => String) postingId: string,
    @Arg("userId", () => String) userId: string
  ) {
    await UserPosting.create({ postingId, userId }).save();
    return true;
  }

  @Query(() => Posting, {
    nullable: true
  })
  async getPostingById(@Arg("id") id: string) {
    return this.postRepo.findOne(id);
  }

  @Mutation(() => SuccessResponse, { name: `updatePosting` })
  @UseMiddleware(isAuth)
  async updatePostingRepo(
    @Arg("id") id: string,
    @Arg("input", { nullable: true }) input: CreatePostingInput,
    @Arg("topicIds", () => [String], { nullable: true }) topicIds: string[],
    @Arg("tagNames", () => [String], { nullable: true }) tagNames: string[]
  ): Promise<SuccessResponse> {
    if (input) {
      await this.postRepo.update(
        { id },
        {
          ...input
        }
      );
    }

    if (tagNames) {
      tagNames.map(async tagName => {
        let tag = await this.tagRepo.findOne({
          where: {
            name: tagName
          }
        });
        if (!tag) {
          tag = await this.tagRepo
            .create({
              name: tagName
            })
            .save();
        }

        PostingTag.delete({ postingId: id });

        const tagConnection = await PostingTag.findOne({
          where: {
            postingId: id,
            tagId: tag
          }
        });

        if (!tagConnection) {
          await this.addPostingTag(id, tag.id);
        }
      });
    }

    if (topicIds) {
      topicIds.map(async (topicId: string) => {
        const topicConnection = await PostingTopic.findOne({
          where: {
            postingId: id,
            topicId: topicId
          }
        });

        if (!topicConnection) {
          await this.addPostingTopic(id, topicId);
        }
      });
    }

    return {
      ok: true
    };
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
  async getPostingsByTopic(
    @Arg("topicIds", () => String) topicIds: string[],
    @Arg("cursor", { nullable: true }) cursor?: string
  ): Promise<FindPostingResponse> {
    return this.postRepo.findByTopicId({
      cursor,
      limit: POST_LIMIT,
      topicIds
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
