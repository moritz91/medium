import {
  Arg,
  Ctx,
  Mutation,
  Resolver,
  UseMiddleware,
  Authorized,
  Query,
  FieldResolver,
  Root
} from "type-graphql";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Comment } from "../../entity/Comment";
import { MyContext } from "../../types/Context";
import { isAuth } from "../middleware/isAuth";
import { CreateCommentInput, FindCommentsByIdInput } from "./Input";
import {
  CommentResponse,
  FindCommentResponse,
  DeleteCommentResponse
} from "./response";
import { CommentRepository } from "../../repositories/CommentRepo";
import { Reaction } from "../../../src/entity/Reaction";

const COMMENT_LIMIT = 5;

@Resolver(Comment)
export class CommentResolver {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: CommentRepository
  ) {}

  @Mutation(() => CommentResponse)
  @UseMiddleware(isAuth)
  async createComment(
    @Arg("comment") input: CreateCommentInput,
    @Ctx() { req }: MyContext
  ): Promise<CommentResponse> {
    const comment = await this.commentRepo.save({
      ...input,
      creatorId: req.session!.userId
    });

    return {
      comment
    };
  }

  @Mutation(() => DeleteCommentResponse, {
    nullable: true
  })
  @Authorized()
  async deleteCommentById(
    @Arg("id") id: string
  ): Promise<DeleteCommentResponse> {
    const value = this.commentRepo.findOne(id);
    if (value) {
      this.commentRepo.delete(id);
      return { ok: true };
    }
    return { ok: false };
  }

  @Query(() => FindCommentResponse)
  async findCommentsById(@Arg("input")
  {
    postingId,
    cursor
  }: FindCommentsByIdInput): Promise<FindCommentResponse> {
    return this.commentRepo.findByPostingId({
      postingId,
      cursor,
      limit: COMMENT_LIMIT
    });
  }

  @FieldResolver()
  numReactions(@Root() root: Comment): Promise<number> {
    return Reaction.count({ where: { commentId: root.id } });
  }

  @FieldResolver()
  async hasReacted(
    @Ctx() ctx: MyContext,
    @Root() root: Comment
  ): Promise<Boolean> {
    const response = await Reaction.findOne({
      where: { commentId: root.id, userId: ctx.req.session!.userId }
    });

    if (response) {
      return true;
    }
    return false;
  }
}
