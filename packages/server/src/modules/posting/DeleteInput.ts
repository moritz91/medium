import { InputType, Field } from "type-graphql";
import { Posting } from "../../entity/Posting";

@InputType({ description: "New posting data" })
export class DeletePostingInput implements Partial<Posting> {
  @Field()
  id: string;
}
