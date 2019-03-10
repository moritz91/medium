import {
  Arg,
  Ctx,
  Mutation,
  Resolver,
  UseMiddleware,
  Authorized,
  Query
} from "type-graphql";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Comment } from "../../entity/Comment";
import { MyContext } from "../../types/Context";
import { isAuth } from "../middleware/isAuth";
import { CreateCommentInput, FindCommentsInput } from "./Input";
import { CommentResponse, FindCommentResponse } from "./response";
import { CommentRepository } from "src/repositories/CommentRepo";

const COMMENT_LIMIT = 10;

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

  @Query(() => FindCommentResponse)
  @Authorized()
  async findUserPostings(@Arg("input")
  {
    cursor,
    postingId
  }: FindCommentsInput): Promise<FindCommentResponse> {
    return this.commentRepo.findByPostingId({
      cursor,
      limit: COMMENT_LIMIT,
      postingId
    });
  }
}
