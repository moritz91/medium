import { User } from "src/entity/User";
import { MyContext } from "src/types/Context";
import { Arg, Authorized, Ctx, FieldResolver, Mutation, Resolver, Root } from "type-graphql";

export function createResolver<ArgType extends Object, T extends Object>(
  suffix: string,
  argType: ArgType,
  entity: any,
  graphqlReturnType: T,
) {
  const argAndReturnKeyName = suffix[0].toLowerCase() + suffix.slice(1);
  @Resolver(entity)
  abstract class BaseResolver {
    @Authorized()
    @Mutation(() => graphqlReturnType, { name: `create${suffix}` })
    async create(
      @Arg(argAndReturnKeyName, () => argType) input: ArgType,
      @Ctx()
      ctx: MyContext,
    ) {
      const value = await (entity as any)
        .create({
          ...(input as any),
          creatorId: ctx.req.session!.userId,
        })
        .save();
      return {
        [argAndReturnKeyName]: value,
      };
    }

    @FieldResolver(() => User)
    creator(@Root() root: any, @Ctx() ctx: MyContext) {
      return ctx.loaders.users.load(root.creatorId);
    }
  }

  return BaseResolver;
}
