import { Posting } from "src/entity/Posting";
import { InputType, Field } from "type-graphql";

@InputType({ description: "New posting data" })
export class CreatePostingInput implements Partial<Posting> {
  @Field()
  title: string;

  @Field({ nullable: true })
  body?: string;
}
