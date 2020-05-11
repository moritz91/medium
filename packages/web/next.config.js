require("dotenv-safe").config({ allowEmptyValues: true });

/* eslint-disable @typescript-eslint/no-var-requires */
const withImages = require("next-images");
// const withMDX = require("@next/mdx")({
//   extension: /\.(md|mdx)$/,
// });

// const { resolve, join } = require("path");

// const withEnvVariables = require("next-runtime-dotenv");

// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.BUNDLE_ANALYZE && true,
// });

// const withEnvVars = withEnvVariables({
//   public: ["BACKEND_URI_DOCKER", "BACKEND_URI"],
// });

// if (typeof require !== "undefined") {
//   require.extensions[".css"] = () => {};
// }

module.exports = withImages({
  // pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],

  webpack(config, options) {
    const CircularDependencyPlugin = require("circular-dependency-plugin");
    config.plugins.push(
      new CircularDependencyPlugin({
        exclude: /node_modules/,
        failOnError: true,
        allowAsyncCycles: false,
        cwd: process.cwd(),
      }),
    );

    // config.module.rules.push({
    //   test: /\.mdx/,
    //   use: [
    //     options.defaultLoaders.babel,
    //     {
    //       loader: "@mdx-js/loader",
    //       options: {},
    //     },
    //   ],
    // });

    return config;
  },
});
