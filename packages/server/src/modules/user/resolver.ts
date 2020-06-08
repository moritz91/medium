import { User } from "src/entity/User";
import { isAuth } from "src/modules/middleware/isAuth";
import { MyContext } from "src/types/Context";
import {
  Arg,
  Authorized,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";

@Resolver(User)
export class UserResolver {
  constructor() {}

  @UseMiddleware(isAuth)
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: MyContext) {
    const { userId } = ctx.req.session!;
    return userId ? User.findOne(userId) : null;
  }

  @Query(() => User, { nullable: true })
  async findUserByName(@Arg("username") username: string) {
    return User.findOne({ username });
  }

  @Mutation(() => Boolean)
  @Authorized()
  async logout(@Ctx() ctx: MyContext) {
    return new Promise((res, rej) =>
      ctx.req.session!.destroy((err) => {
        if (err) {
          console.log(err);
          return rej(false);
        }

        ctx.res.clearCookie("qid");
        return res(true);
      }),
    );
  }
}
