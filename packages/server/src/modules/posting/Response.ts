import { Posting } from "src/entity/Posting";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class PostingResponse {
  @Field()
  posting: Posting;
}

@ObjectType()
export class FindPostingResponse {
  @Field()
  hasMore: boolean;

  @Field(() => [Posting])
  posts: Posting[];
}
