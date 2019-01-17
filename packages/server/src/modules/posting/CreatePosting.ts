import { Resolver, Mutation } from "type-graphql";

@Resolver()
export class CreatePostingResolver {
  @Mutation()
  async createPostingResolver() {}
}
