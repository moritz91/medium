import * as session from "express-session";
import * as connectRedis from "connect-redis";
import * as Redis from "ioredis";

const SESSION_SECRET = "ajslkjalksjdfkl";
const RedisStore = connectRedis(session as any);

const redis =
  process.env.NODE_ENV === "production"
    ? new Redis(process.env.REDIS_URL)
    : new Redis();

export default session({
  store: new RedisStore({
    client: redis as any,
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
} as any);
