import * as middlewares from "@medium/common";
import { ApolloServer } from "apollo-server-express";
import * as express from "express";
import * as passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { Container } from "typedi";
import * as typeorm from "typeorm";
import { User } from "./entity/User";
import { seedData } from "./helpers/seedData";
import { backendURI, frontendURI } from "./helpers/uris";
import { postingTagLoader } from "./loaders/postingTagLoader";
import { postingTopicLoader } from "./loaders/postingTopicLoader";
import { tagPostingLoader } from "./loaders/tagPostingLoader";
import { topicPostingLoader } from "./loaders/topicPostingLoader";
import { userLoader } from "./loaders/userLoader";
import { userPostingLoader } from "./loaders/userPostingLoader";
import { userTopicLoader } from "./loaders/userTopicLoader";
import { createTypeormConn } from "./typeorm";
require("dotenv-safe").config({
  allowEmptyValues: true,
});

interface ExpressRequestResponse {
  req: express.Request;
  res: express.Response;
}

typeorm.useContainer(Container);

process.env.GITHUB_CLIENT_ID;


const startServer = async () => {
  const conn = await createTypeormConn();
  
  // pre-populate the db with some data
  if (conn?.isConnected && process.env.NODE_ENV === "production") {
    await seedData();
  }
  
  const app = express();
  
  const server = new ApolloServer({
    schema: await buildSchema({
      // resolvers: [UserResolver, LogoutResolver]
      resolvers: [__dirname + "/modules/**/resolver.*"],
      authChecker: ({ context }: { context: ExpressRequestResponse }) => {
        return context.req.session && context.req.session.userId; // or false if access denied
      },
      validate: false,
      container: Container,
    }),
    context: ({ req, res }: ExpressRequestResponse) => ({
      req,
      res,
      userLoader: userLoader(),
      postingTagLoader: postingTagLoader(),
      tagPostingLoader: tagPostingLoader(),
      postingTopicLoader: postingTopicLoader(),
      topicPostingLoader: topicPostingLoader(),
      userPostingLoader: userPostingLoader(),
      userTopicLoader: userTopicLoader(),
    }),
    engine: {
      apiKey: process.env.ENGINE_API_KEY,
    },
  });

  app.set("trust proxy", 1);

  app.use(middlewares.cors);

  app.use((req, _, next) => {
    const authorization = req.headers.authorization;

    if (authorization) {
      try {
        const qid = authorization.split(" ")[1];
        req.headers.cookie = `qid=${qid}`;
      } catch (_) {}
    }

    return next();
  });

  app.use(middlewares.session);

  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        callbackURL: backendURI + "/oauth/github",
      },
      async (accessToken, refreshToken, profile: any, cb) => {
        let user = await User.findOne({
          where: {
            githubId: profile.id,
          },
        });
        if (!user) {
          user = await User.create({
            username: profile.username,
            githubId: profile.id,
            pictureUrl: profile._json.avatar_url,
            bio: profile._json.bio,
          }).save();
        }

        cb(null, {
          user,
          accessToken,
          refreshToken,
        });
      },
    ),
  );

  app.use(passport.initialize());

  app.get(
    "/auth/github",
    passport.authenticate("github", {
      session: false,
    }),
  );

  app.get(
    "/oauth/github",
    passport.authenticate("github", {
      session: false,
    }),
    (req: any, res) => {
      if (req.user.user.id) {
        req.session.userId = req.user.user.id;
        req.session.accessToken = req.user.accessToken;
        req.session.refreshToken = req.user.refreshToken;
      }
      res.redirect(frontendURI + "/posts");
    },
  );

  server.applyMiddleware({
    app,
    cors: false,
  });

  app.listen({ port: 4000 }, () =>
    console.log(
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}`,
    ),
  );
};

startServer();
