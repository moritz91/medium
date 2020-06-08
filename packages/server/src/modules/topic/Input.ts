import { Topic } from "src/entity/Topic";
import { Field, InputType, Int } from "type-graphql";

@InputType({ description: "New topic data" })
export class CreateTopicInput implements Partial<Topic> {
  @Field()
  name: string;

  @Field({ nullable: true })
  shortCaption?: string;

  @Field({ nullable: true })
  pictureUrl?: string;
}

@InputType({ description: "Update topic data" })
export class UpdateTopicInput implements Partial<Topic> {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  shortCaption?: string;

  @Field({ nullable: true })
  pictureUrl?: string;
}

@InputType({ description: "Old topic data" })
export class DeleteTopicInput implements Partial<Topic> {
  @Field()
  id: string;
}

@InputType()
export class FindTopicsInput {
  @Field(() => Int)
  offset: number;

  @Field(() => Int)
  limit: number;
}

@InputType()
export class FindUserTopicsInput {
  @Field()
  creatorId: string;

  @Field(() => String, { nullable: true })
  cursor?: string;
}
