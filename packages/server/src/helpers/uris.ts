const isProduction = process.env.NODE_ENV === "production";

export const frontendURI =
  "http://" +
  (isProduction ? process.env.FRONTEND_URI_DOCKER : process.env.FRONTEND_URI);

export const backendURI =
  "http://" +
  (isProduction ? process.env.BACKEND_URI_DOCKER : process.env.BACKEND_URI);
