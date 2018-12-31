import "reflect-metadata";
require("dotenv-safe").config({
  allowEmptyValues: true
});
import { ApolloServer } from "apollo-server-express";
import * as express from "express";
import { buildSchema } from "type-graphql";
import * as session from "express-session";
import * as connectRedis from "connect-redis";
import { redis } from "./redis";
import * as passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github";
import * as cors from "cors";

import { createTypeormConn } from "./createTypeormConn";
import { UserResolver } from "./modules/user/UserResolver";
import { User } from "./entity/User";

process.env.GITHUB_CLIENT_ID;

const SESSION_SECRET = "ajslkjalksjdfkl";
const RedisStore = connectRedis(session as any);

const startServer = async () => {
  await createTypeormConn();

  const app = express();

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver]
    })
  });

  app.set("trust proxy", 1);

  app.use(
    cors({
      credentials: true,
      origin: process.env.NODE_ENV = "production"
        ? "http://www.xy.com"
        : "http://http://localhost:3001"
    })
  );

  app.use(
    session({
      store: new RedisStore({
        client: redis as any
      }),
      name: "qid",
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365 // 7 years
      }
    } as any)
  );

  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        callbackURL: "http://localhost:4000/oauth/github"
      },
      async (accessToken, refreshToken, profile: any, cb) => {
        let user = await User.findOne({ where: { githubId: profile.id } });
        if (!user) {
          user = await User.create({
            username: profile.username,
            githubId: profile.id,
            pictureUrl: profile._json.avatar_url,
            bio: profile._json.bio
          }).save();
        }

        cb(null, { user, accessToken, refreshToken });
      }
    )
  );

  app.use(passport.initialize());

  app.get("/auth/github", passport.authenticate("github"));

  app.get(
    "/oauth/github",
    passport.authenticate("github", { session: false }),
    function(req: any, res) {
      req.session.userId = req.user.id;
      req.session.accessToken = req.user.accessToken;
      req.session.refreshToken = req.user.refreshToken;
      res.redirect("http://localhost:3000");
    }
  );

  server.applyMiddleware({ app, cors: false }); // app is from an existing express app

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();
