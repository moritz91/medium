import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../../types/Context";

export const logger: MiddlewareFn<MyContext> = async ({ args }, next) => {
  console.log("args:", args);

  return next();
};
