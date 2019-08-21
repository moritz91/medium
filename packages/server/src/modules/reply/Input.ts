import { Field, InputType } from "type-graphql";
import { Reply } from "../../entity/Comment";

@InputType()
export class CreateReplyInput implements Partial<Reply> {
  @Field()
  text: string;

  @Field()
  commentId: string;
}

@InputType()
export class DeleteReplyInput implements Partial<Reply> {
  @Field()
  id: string;
}

@InputType()
export class FindRepliesByIdInput {
  @Field()
  commentId: string;

  @Field(() => String, { nullable: true })
  cursor?: string;
}

@InputType()
export class FindRepliesByUsernameInput {
  @Field()
  username: string;

  @Field(() => String, { nullable: true })
  cursor?: string;
}
