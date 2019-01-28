import { InputType, Field, Int } from "type-graphql";

@InputType()
export class FindPostingInput {
  @Field(() => Int)
  offset: number;

  @Field(() => Int)
  limit: number;
}
