import { InputType, Field } from "type-graphql";
import { Posting } from "../../entity/Posting";

@InputType({ description: "New posting data" })
export class CreatePostingInput implements Partial<Posting> {
  @Field()
  title: string;

  @Field({ nullable: true })
  body?: string;
}
