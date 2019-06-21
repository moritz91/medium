import { ObjectType, Field } from "type-graphql";
import { Topic } from "../../entity/Topic";

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
