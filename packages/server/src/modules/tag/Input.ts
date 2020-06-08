import { Tag } from "src/entity/Tag";
import { Field, InputType, Int } from "type-graphql";

@InputType({ description: "New posting data" })
export class CreateTagInput implements Partial<Tag> {
  @Field()
  name: string;
}

@InputType({ description: "Old posting data" })
export class DeleteTagInput implements Partial<Tag> {
  @Field()
  id: string;
}

@InputType()
export class FindTagsInput {
  @Field(() => Int)
  offset: number;

  @Field(() => Int)
  limit: number;
}
