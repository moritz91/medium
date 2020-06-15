import { Reply } from "src/entity/Comment";
import { Reaction } from "src/entity/Reaction";
import { isAuth } from "src/modules/middleware/isAuth";
import { ReplyRepository } from "src/repositories/ReplyRepo";
import { MyContext } from "src/types/Context";
import { Arg, Authorized, Ctx, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { InjectRepository } from "typeorm-typedi-extensions";
import { CreateReplyInput, FindRepliesByIdInput } from "./Input";
import { DeleteReplyResponse, FindReplyResponse, ReplyResponse } from "./Response";

const COMMENT_LIMIT = 5;

@Resolver(Reply)
export class ReplyResolver {
  constructor(
    @InjectRepository(Reply)
    private readonly replyRepo: ReplyRepository,
  ) {}

  @Mutation(() => ReplyResponse)
  @UseMiddleware(isAuth)
  async createReply(@Arg("reply") input: CreateReplyInput, @Ctx() { req }: MyContext): Promise<ReplyResponse> {
    const reply = await this.replyRepo.save({
      ...input,
      creatorId: req.session!.userId,
    });

    return {
      reply,
    };
  }

  @Mutation(() => DeleteReplyResponse, {
    nullable: true,
  })
  @Authorized()
  async deleteReplyById(@Arg("id") id: string): Promise<DeleteReplyResponse> {
    const value = this.replyRepo.findOne(id);
    if (value) {
      this.replyRepo.delete(id);
      return { ok: true };
    }
    return { ok: false };
  }

  @Query(() => FindReplyResponse)
  async findRepliesById(
    @Arg("input")
    { commentId, cursor }: FindRepliesByIdInput,
  ): Promise<FindReplyResponse> {
    return this.replyRepo.findByCommentId({
      commentId,
      cursor,
      limit: COMMENT_LIMIT,
    });
  }

  @FieldResolver(() => Number)
  numReactions(@Root() root: Reply): Promise<number> {
    return Reaction.count({
      where: { replyId: root.id, commentId: root.commentId },
    });
  }

  @FieldResolver(() => Boolean)
  async hasReacted(@Ctx() ctx: MyContext, @Root() root: Reply): Promise<Boolean> {
    const response = await Reaction.findOne({
      where: { replyId: root.id, userId: ctx.req.session!.userId },
    });

    if (response) {
      return true;
    }
    return false;
  }
}
