import { Resolver, Query } from "type-graphql";
import { findOrCreateResolver } from "../shared/find-or-create-resolver";
import { CreatePostingResponse } from "./CreateResponse";
import { CreatePostingInput } from "./CreateInput";
import { Posting } from "../../entity/Posting";
import { loadCreatorResolver } from "../shared/load-creator-resolver";
import { getByIdResolver } from "../shared/get-by-id-resolver";

const suffix = "Posting";

export const findOrCreatePosting = findOrCreateResolver(
  suffix,
  CreatePostingInput,
  Posting,
  CreatePostingResponse,
  ["commitId", "repo", "repoOwner"] as any
);

export const loadCreatorForPosting = loadCreatorResolver(Posting);
export const getPostingById = getByIdResolver(suffix, Posting, Posting);

@Resolver()
export class PostingResolver {
  private postingsCollection: Posting[] = [];

  @Query(() => [Posting])
  async postings() {
    return await this.postingsCollection;
  }
}
