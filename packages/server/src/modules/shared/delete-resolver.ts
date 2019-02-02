import {
  Resolver,
  Authorized,
  Arg,
  Mutation,
  Ctx,
  FieldResolver,
  Root
} from "type-graphql";
import { MyContext } from "../../types/Context";
import { User } from "../../entity/User";

export function deleteResolver<ArgType extends Object, T extends Object>(
  suffix: string,
  argType: ArgType,
  entity: any,
  graphqlReturnType: T
) {
  const argAndReturnKeyName = suffix[0].toLowerCase() + suffix.slice(1);
  @Resolver(entity)
  abstract class BaseResolver {
    @Authorized()
    @Mutation(() => graphqlReturnType, { name: `create${suffix}` })
    async create(
      @Arg(argAndReturnKeyName, () => argType) input: ArgType,
      @Ctx()
      ctx: MyContext
    ) {
      const value = await (entity as any)
        .delete({
          ...(input as any),
          creatorId: ctx.req.session!.userId
        })
        .save();
      return {
        [argAndReturnKeyName]: value
      };
    }

    @FieldResolver(() => User)
    creator(@Root() root: any, @Ctx() ctx: MyContext) {
      return ctx.userLoader.load(root.creatorId);
    }
  }

  return BaseResolver;
}
