import { ApolloError } from "apollo-server-core";
import { Bookmark } from "src/entity/Bookmark";
import { Posting } from "src/entity/Posting";
import { PostingTag } from "src/entity/PostingTag";
import { PostingTopic } from "src/entity/PostingTopic";
import { Reaction } from "src/entity/Reaction";
import { User } from "src/entity/User";
import { UserTopic } from "src/entity/UserTopic";
import { isAuth } from "src/modules/middleware/isAuth";
import { CommentRepository } from "src/repositories/CommentRepo";
import { PostingRepository } from "src/repositories/PostRepo";
import { TagRepository } from "src/repositories/TagRepo";
import { MyContext } from "src/types/Context";
import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { loadCreatorResolver } from "../shared/load-creator-resolver";
import { SuccessResponse } from "../shared/Response";
import {
  CreatePostingInput,
  FindPostingsInput,
  FindUserPostingsInput,
} from "./Input";
import { FindPostingResponse, PostingResponse } from "./Response";

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
  creator(@Root() root: Posting, @Ctx() ctx: MyContext) {
    return ctx.loaders.users.load(root.creatorId);
  }

  @FieldResolver()
  async isBookmark(
    @Ctx() ctx: MyContext,
    @Root() root: Posting,
  ): Promise<Boolean> {
    const response = await Bookmark.findOne({
      where: { postingId: root.id, userId: ctx.req.session!.userId },
    });

    if (response) {
      return true;
    }
    return false;
  }

  @FieldResolver()
  numComments(@Root() root: Posting): Promise<number> {
    return this.commentRepo.count({ where: { postingId: root.id } });
  }

  @FieldResolver()
  numReactions(@Root() root: Posting): Promise<number> {
    return Reaction.count({ where: { postingId: root.id } });
  }

  @Mutation(() => PostingResponse, { name: `createPosting` })
  @UseMiddleware(isAuth)
  async createPostingRepo(
    @Arg("posting") input: CreatePostingInput,
    @Arg("topicIds", () => [String]) topicIds: string[],
    @Arg("tagNames", () => [String]) tagNames: string[],
    @Ctx() { req }: MyContext,
  ): Promise<PostingResponse> {
    const posting = await this.postRepo
      .create({ ...input, creatorId: req.session!.userId })
      .save();

    tagNames.map(async (tagName) => {
      let tag = await this.tagRepo.findOne({ where: { name: tagName } });
      if (!tag) {
        tag = await this.tagRepo.create({ name: tagName }).save();
      }
      await this.addPostingTag(posting.id, tag.id);
    });

    if (topicIds) {
      topicIds.map(async (topicId: string) => {
        await this.addPostingTopic(posting.id, topicId);
      });
    }

    return { posting };
  }

  @Mutation(() => SuccessResponse, { nullable: true })
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
    @Arg("tagId", () => String) tagId: string,
  ) {
    await PostingTag.create({ postingId, tagId }).save();
    return true;
  }

  @Mutation(() => Boolean)
  @Authorized()
  async addPostingTopic(
    @Arg("postingId", () => String) postingId: string,
    @Arg("topicId", () => String) topicId: string,
  ) {
    await PostingTopic.create({ postingId, topicId }).save();
    return true;
  }

  @Mutation(() => Boolean)
  @Authorized()
  async addReaction(
    @Ctx() { req }: MyContext,
    @Arg("postingId", () => String, { nullable: true }) postingId?: string,
    @Arg("commentId", () => String, { nullable: true }) commentId?: string,
  ) {
    const userId = req.session!.userId;
    if (postingId) {
      const value = await Reaction.findOne({ where: { userId, postingId } });
      if (!value) {
        await Reaction.create({ postingId, userId }).save();
        return true;
      }
    }
    if (commentId) {
      const value = await Reaction.findOne({ where: { userId, commentId } });
      if (!value) {
        await Reaction.create({ userId, commentId }).save();
        return true;
      }
    }
    return false;
  }

  @Mutation(() => Boolean)
  @Authorized()
  async removeReaction(
    @Ctx() { req }: MyContext,
    @Arg("postingId", () => String, { nullable: true }) postingId?: string,
    @Arg("commentId", () => String, { nullable: true }) commentId?: string,
  ) {
    const userId = req.session!.userId;
    if (postingId) {
      await Reaction.delete({ postingId, userId });
      return true;
    }
    if (commentId) {
      await Reaction.delete({ commentId, userId });
      return true;
    }
    return false;
  }

  @Mutation(() => Boolean)
  @Authorized()
  async addUserTopic(
    @Arg("topicId", () => String) topicId: string,
    @Ctx() { req }: MyContext,
  ) {
    const userId = req.session!.userId;
    const value = await UserTopic.findOne({ where: { userId, topicId } });
    if (!value) {
      await UserTopic.create({ topicId, userId }).save();
      return true;
    }
    return false;
  }

  @Mutation(() => Boolean)
  @Authorized()
  async removeUserTopic(
    @Arg("topicId", () => String) topicId: string,
    @Ctx() { req }: MyContext,
  ) {
    const userId = req.session!.userId;
    const value = await UserTopic.findOne({ where: { userId, topicId } });
    if (value) {
      await UserTopic.delete({ topicId, userId });
      return true;
    }
    return false;
  }

  @Mutation(() => Boolean)
  @Authorized()
  async addBookmark(
    @Arg("postingId", () => String) postingId: string,
    @Ctx() { req }: MyContext,
  ) {
    const userId = req.session!.userId;
    const value = await Bookmark.findOne({ where: { userId, postingId } });
    if (!value) {
      await Bookmark.create({ userId, postingId }).save();
      return true;
    }
    return false;
  }

  @Mutation(() => Boolean)
  @Authorized()
  async removeBookmark(
    @Arg("postingId", () => String) postingId: string,
    @Ctx() { req }: MyContext,
  ) {
    const userId = req.session!.userId;
    const value = await Bookmark.findOne({ where: { userId, postingId } });
    if (value) {
      await Bookmark.delete({ postingId, userId });
      return true;
    }
    return false;
  }

  @Query(() => Posting, { nullable: true })
  async getPostingById(@Arg("id") id: string) {
    return this.postRepo.findOne(id);
  }

  @Mutation(() => SuccessResponse, { name: `updatePosting` })
  @UseMiddleware(isAuth)
  async updatePostingRepo(
    @Arg("id") id: string,
    @Arg("input", { nullable: true }) input: CreatePostingInput,
    @Arg("topicIds", () => [String], { nullable: true }) topicIds: string[],
    @Arg("tagNames", () => [String], { nullable: true }) tagNames: string[],
  ): Promise<SuccessResponse> {
    if (input) {
      await this.postRepo.update({ id }, { ...input });
    }

    if (tagNames) {
      tagNames.map(async (tagName) => {
        let tag = await this.tagRepo.findOne({ where: { name: tagName } });

        if (!tag) {
          tag = await this.tagRepo.create({ name: tagName }).save();
        }

        PostingTag.delete({ postingId: id });

        const tagConnection = await PostingTag.findOne({
          where: { postingId: id, tagId: tag },
        });

        if (!tagConnection) {
          await this.addPostingTag(id, tag.id);
        }
      });
    }

    if (topicIds) {
      topicIds.map(async (topicId: string) => {
        const topicConnection = await PostingTopic.findOne({
          where: { postingId: id, topicId: topicId },
        });

        if (!topicConnection) {
          await this.addPostingTopic(id, topicId);
        }
      });
    }

    return { ok: true };
  }

  @Query(() => FindPostingResponse)
  async findPostings(@Arg("input")
  {
    offset,
    limit,
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
      posts: posts.slice(0, limit),
    };
  }

  @Query(() => FindPostingResponse)
  async getPostingsByTopic(
    @Arg("topicIds", () => String) topicIds: string[],
    @Arg("cursor", { nullable: true }) cursor?: string,
  ): Promise<FindPostingResponse> {
    return this.postRepo.findByTopicId({ cursor, limit: POST_LIMIT, topicIds });
  }

  @Query(() => FindPostingResponse)
  @Authorized()
  async findUserPostings(@Arg("input")
  {
    cursor,
    creatorId,
  }: FindUserPostingsInput): Promise<FindPostingResponse> {
    return this.postRepo.findByCreatorId({
      cursor,
      limit: POST_LIMIT,
      creatorId,
    });
  }

  @FieldResolver()
  async hasReacted(
    @Ctx() ctx: MyContext,
    @Root() root: Posting,
  ): Promise<Boolean> {
    const response = await Reaction.findOne({
      where: { postingId: root.id, userId: ctx.req.session!.userId },
    });

    if (response) return true;
    return false;
  }

  @FieldResolver()
  async readingTime(@Root() root: Posting): Promise<number> {
    const wordCount = root.body.trim().split(/\s+/).length;
    const readingTime = wordCount / 264;

    return readingTime;
  }
}
