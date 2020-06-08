import { Topic } from "src/entity/Topic";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class TopicResponse {
  @Field()
  topic: Topic;
}

@ObjectType()
export class FindTopicResponse {
  @Field()
  hasMore: boolean;

  @Field(() => [Topic])
  topics: Topic[];
}
