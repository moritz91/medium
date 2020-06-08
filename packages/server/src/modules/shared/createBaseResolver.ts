import { User } from "src/entity/User";
import { MyContext } from "src/types/Context";
import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  Mutation,
  Resolver,
  Root,
} from "type-graphql";

export function createBaseResolver<
  T extends Function,
  ArgType extends Function
>(suffix: string, argType: ArgType, entity: any, graphqlReturnType: T) {
  const argAndReturnKeyName = suffix[0].toLowerCase() + suffix.slice(1);
  @Resolver(entity, { isAbstract: true })
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
      return ctx.userLoader.load(root.creatorId);
    }
  }

  return BaseResolver;
}
