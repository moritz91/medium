import { Tag } from "src/entity/Tag";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class TagResponse {
  @Field()
  tag: Tag;
}

@ObjectType()
export class DeleteTagResponse {
  @Field()
  ok: boolean;
}

@ObjectType()
export class FindTagResponse {
  @Field()
  hasMore: boolean;

  @Field(() => [Tag])
  tags: Tag[];
}
