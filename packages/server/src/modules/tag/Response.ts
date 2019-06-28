import { ObjectType, Field } from "type-graphql";
import { Tag } from "../../entity/Tag";

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
