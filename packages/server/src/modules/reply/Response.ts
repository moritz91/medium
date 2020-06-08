import { Reply } from "src/entity/Comment";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class ReplyResponse {
  @Field()
  reply: Reply;
}

@ObjectType()
export class DeleteReplyResponse {
  @Field()
  ok: boolean;
}

@ObjectType()
export class FindReplyResponse {
  @Field()
  hasMore: boolean;

  @Field(() => [Reply])
  replies: Reply[];
}
