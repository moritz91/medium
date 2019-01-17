import { Resolver, Query } from "type-graphql";
import { Posting } from "src/entity/Posting";
import { CreatePostingInput } from "src/modules/posting/CreateInput";
import { findOrCreateResolver } from "../shared/find-or-create-resolver";
import { CreatePostingResponse } from "./CreateResponse";

const suffix = "Posting";

export const findOrCreatePosting = findOrCreateResolver(
  suffix,
  CreatePostingInput,
  Posting,
  CreatePostingResponse,
  ["commitId", "repo", "repoOwner"] as any
);

@Resolver()
export class PostingResolver {
  private postingsCollection: Posting[] = [];

  @Query(() => [Posting])
  async postings() {
    return await this.postingsCollection;
  }
}
