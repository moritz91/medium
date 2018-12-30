import "reflect-metadata";
require("dotenv-safe").config({
  allowEmptyValues: true
});
import { ApolloServer } from "apollo-server-express";
import * as express from "express";
import { buildSchema } from "type-graphql";

import { createTypeormConn } from "./createTypeormConn";
import { UserResolver } from "./modules/user/UserResolver";
import * as passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github";

process.env.GITHUB_CLIENT_ID;

const startServer = async () => {
  await createTypeormConn();

  const app = express();

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver]
    })
  });

  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        callbackURL: "http://localhost:4000/oauth/github"
      },
      (_accessToken, _refreshToken, profile, cb) => {
        console.log(profile, cb);
      }
    )
  );

  app.use(passport.initialize());

  app.get("/auth/github", passport.authenticate("github", { session: false }));

  app.get("/oauth/github", passport.authenticate("github"), function(req, res) {
    console.log(req.user);
    res.redirect("http://localhost:3000");
  });

  server.applyMiddleware({ app }); // app is from an existing express app

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();
