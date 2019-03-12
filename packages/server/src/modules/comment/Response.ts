import { Field, ObjectType } from "type-graphql";
import { Comment } from "../../entity/Comment";

@ObjectType()
export class CommentResponse {
  @Field()
  comment: Comment;
}

@ObjectType()
export class DeleteCommentResponse {
  @Field()
  ok: boolean;
}

@ObjectType()
export class FindCommentResponse {
  @Field()
  hasMore: boolean;

  @Field(() => [Comment])
  comments: Comment[];
}
