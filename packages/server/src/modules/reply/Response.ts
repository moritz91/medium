import { Field, ObjectType } from "type-graphql";
import { Reply } from "../../entity/Comment";

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
