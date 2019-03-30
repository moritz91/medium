import { InputType, Field, Int } from "type-graphql";
import { Posting } from "../../entity/Posting";

@InputType({ description: "New posting data" })
export class CreatePostingInput implements Partial<Posting> {
  @Field()
  title: string;

  @Field({ nullable: true })
  body?: string;

  @Field()
  topicId: string;
}

@InputType({ description: "Old posting data" })
export class DeletePostingInput implements Partial<Posting> {
  @Field()
  id: string;
}

@InputType()
export class FindPostingsInput {
  @Field(() => Int)
  offset: number;

  @Field(() => Int)
  limit: number;
}

@InputType()
export class FindUserPostingsInput {
  @Field()
  creatorId: string;

  @Field(() => String, { nullable: true })
  cursor?: string;
}

@InputType()
export class FindTopicPostingsInput {
  @Field()
  topicId: string;

  @Field(() => String, { nullable: true })
  cursor?: string;
}
