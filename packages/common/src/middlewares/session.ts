import * as connectRedis from "connect-redis";
import * as session from "express-session";
import * as Redis from "redis";

const SESSION_SECRET = "ajslkjalksjdfkl";
const RedisStore = connectRedis(session);

const redis =
  process.env.NODE_ENV === "production"
    ? new Redis.RedisClient({ url: process.env.REDIS_URL })
    : new Redis.RedisClient({ host: "localhost", port: 6379 });

export default session({
  store: new RedisStore({
    client: redis,
  }),
  name: "qid",
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
  },
});
