import { MyContext } from "src/types/Context";
import { MiddlewareFn } from "type-graphql";

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  if (!context.req.session!.userId) {
    throw new Error("not authenticated");
  } else {
    return next();
  }
};
