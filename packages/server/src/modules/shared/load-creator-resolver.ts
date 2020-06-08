import { User } from "src/entity/User";
import { MyContext } from "src/types/Context";
import { Ctx, FieldResolver, Resolver, Root } from "type-graphql";

export function loadCreatorResolver(entity: any) {
  @Resolver(entity, { isAbstract: true })
  abstract class BaseResolver {
    @FieldResolver(() => User)
    creator(@Root() root: any, @Ctx() ctx: MyContext) {
      return ctx.loaders.users.load(root.creatorId);
    }
  }

  return BaseResolver;
}
