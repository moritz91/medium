import { Comment } from "src/entity/Comment";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateCommentInput implements Partial<Comment> {
  @Field()
  text: string;

  @Field()
  postingId: string;
}

@InputType()
export class DeleteCommentInput implements Partial<Comment> {
  @Field()
  id: string;
}

@InputType()
export class FindCommentsByIdInput {
  @Field()
  postingId: string;

  @Field(() => String, { nullable: true })
  cursor?: string;
}

@InputType()
export class FindCommentsByUsernameInput {
  @Field()
  username: string;

  @Field(() => String, { nullable: true })
  cursor?: string;
}
