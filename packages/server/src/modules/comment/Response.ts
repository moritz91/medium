import { Comment } from "src/entity/Comment";
import { Field, ObjectType } from "type-graphql";

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
