import { ObjectType, Field } from "type-graphql";
import { Posting } from "../../entity/Posting";

@ObjectType()
export class PostingResponse {
  @Field()
  posting: Posting;
}
