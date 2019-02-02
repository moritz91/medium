import { Resolver, Query, Arg } from "type-graphql";
import { findOrCreateResolver } from "../shared/find-or-create-resolver";
import { CreatePostingResponse } from "./CreateResponse";
import { CreatePostingInput } from "./CreateInput";
import { Posting } from "../../entity/Posting";
import { loadCreatorResolver } from "../shared/load-creator-resolver";
import { getByIdResolver } from "../shared/get-by-id-resolver";
import { getConnection } from "typeorm";
import { ApolloError } from "apollo-server-core";
import { FindPostingInput } from "./findInput";
import { FindPostingResponse } from "./findResponse";
import { createResolver } from "../shared/create-resolver";

const suffix = "Posting";

export const findOrCreatePosting = findOrCreateResolver(
  suffix,
  CreatePostingInput,
  Posting,
  CreatePostingResponse,
  ["commitId", "repo", "repoOwner"] as any
);

export const createPosting = createResolver(
  suffix,
  CreatePostingInput,
  Posting,
  CreatePostingResponse
);

export const loadCreatorForPosting = loadCreatorResolver(Posting);
export const getPostingById = getByIdResolver(suffix, Posting, Posting);

@Resolver()
export class PostingResolver {
  @Query(() => FindPostingResponse)
  async findPosting(@Arg("input")
  {
    offset,
    limit
  }: FindPostingInput): Promise<FindPostingResponse> {
    if (limit > 6) {
      throw new ApolloError("max limit of 6");
    }

    const posts = await getConnection()
      .getRepository(Posting)
      .createQueryBuilder("posting")
      .skip(offset)
      .take(limit + 1)
      // .orderBy('"createdAt"', "DESC")
      .getMany();

    return {
      hasMore: posts.length === limit + 1,
      posts: posts.slice(0, limit)
    };
  }
}
