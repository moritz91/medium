import { Resolver, Query, Ctx, UseMiddleware, Mutation } from "type-graphql";
import { User } from "../../entity/User";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../../types/Context";

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

  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: MyContext) {
    return new Promise((res, rej) =>
      ctx.req.session!.destroy(err => {
        if (err) {
          console.log(err);
          return rej(false);
        }

        ctx.res.clearCookie("qid");
        return res(true);
      })
    );
  }
}
