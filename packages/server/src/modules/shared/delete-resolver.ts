import { Resolver, Authorized, Arg, Mutation } from "type-graphql";

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
    @Mutation(() => graphqlReturnType, { name: `delete${suffix}` })
    async create(@Arg(argAndReturnKeyName, () => argType) input: ArgType) {
      const value = await entity.findOne({ input });

      if (value) {
        await entity.remove(value);
        return { ok: true };
      }
      return {
        ok: false
      };
    }
  }

  return BaseResolver;
}
