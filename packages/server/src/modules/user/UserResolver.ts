import { Resolver, Query, Ctx, UseMiddleware } from "type-graphql";
import { User } from "../../entity/User";
import { MyContext } from "src/types/Context";
import { isAuth } from "../middleware/isAuth";

@Resolver(User)
export class UserResolver {
  constructor() {}

  @UseMiddleware(isAuth)
  @Query(() => User, { nullable: true })
  async me(
    @Ctx()
    ctx: MyContext
  ) {
    const { userId } = ctx.req.session!;
    return userId ? User.findOne(userId) : null;
  }
}
