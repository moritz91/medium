import { MiddlewareFn } from "type-graphql";
import { MyContext } from "src/types/Context";

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  if (!context.req.session!.userId) {
    throw new Error("not authenticated");
  } else {
    return next();
  }
};
