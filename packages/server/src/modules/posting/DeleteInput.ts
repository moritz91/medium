import { InputType, Field } from "type-graphql";
import { Posting } from "../../entity/Posting";

@InputType({ description: "Old posting data" })
export class DeletePostingInput implements Partial<Posting> {
  @Field()
  id: string;
}
