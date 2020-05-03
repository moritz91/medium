import * as cors from "cors";

const corseOptions: cors.CorsOptions = {
  origin:
    process.env.NODE_ENV == "production"
      ? ["http://frontend:3000", "http://localhost:8080"].filter(Boolean)
      : "http://localhost:3000",
  credentials: true,
};

export default cors(corseOptions);
