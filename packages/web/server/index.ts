require("dotenv-safe").config({
  allowEmptyValues: true,
});

import { createServer } from "http";
import { parse } from "url";
import * as next from "next";

import { routes } from "./routes";

const port = parseInt(process.env.PORT!, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = routes.getRequestHandler(app);

(app as any).prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);

    handle(req, res, parsedUrl);
  }).listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
