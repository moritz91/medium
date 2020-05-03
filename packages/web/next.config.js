/* eslint-disable @typescript-eslint/no-var-requires */
const withTypescript = require("@zeit/next-typescript");
const withCSS = require("@zeit/next-css");
const withImages = require("next-images");
const withEnvVariables = require("next-runtime-dotenv");

if (typeof require !== "undefined") {
  require.extensions[".css"] = () => {};
}

const withEnvVars = withEnvVariables({
  public: ["BACKEND_URI_DOCKER", "BACKEND_URI"],
});

module.exports = withEnvVars(withTypescript(withCSS(withImages())));
