import { ObjectType, Field } from "type-graphql";
import { Posting } from "src/entity/Posting";

@ObjectType()
export class CreatePostingResponse {
  @Field()
  posting: Posting;
}
