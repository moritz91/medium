import * as nextRoutes from "next-routes";

// @ts-ignore
export const routes = nextRoutes() as Routes;
export const Router = routes.Router;
export const Link = routes.Link;

routes.add("edit-post", "/p/:id/edit/:path*");
routes.add("post", "/p/:id/:path*");
routes.add("posts", "/posts/:tag?/:path*");
routes.add("reading-list", "/readinglist/:path*");
routes.add("topic", "/topic/:name/:path*");
routes.add("profile", "/@:username/:path*");
routes.add("create-post", "/create/:path*");
