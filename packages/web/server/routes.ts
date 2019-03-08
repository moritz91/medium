import * as nextRoutes from "next-routes";

// @ts-ignore
export const routes = nextRoutes() as Routes;
export const Router = routes.Router;
export const Link = routes.Link;

routes.add("post", "/p/:id/:path*");
routes.add("profile", "/@:username/:path*");
