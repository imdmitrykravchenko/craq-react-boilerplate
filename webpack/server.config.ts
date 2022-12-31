import path from "path";

import webpack, { Configuration } from "webpack";
import nodeExternals from "webpack-node-externals";
import NodemonPlugin from "nodemon-webpack-plugin";

import rules from "./rules";

export default (
  env,
  { mode = "development" }: { mode: Configuration["mode"] }
): Configuration => {
  const cwd = process.cwd();
  const distFilename = "server.js";

  return {
    mode,
    watch: mode === "development",
    entry: { server: path.resolve(cwd, env.SRC_PATH, "server.ts") },
    module: {
      rules: rules(true),
    },
    stats: mode === "development" ? "errors-only" : "verbose",
    resolve: {
      symlinks: false,
      extensions: [".tsx", ".ts", ".js"],
    },
    target: "node",
    output: {
      publicPath: "",
      path: path.resolve(cwd, env.BUILD_PATH),
      filename: distFilename,
    },
    plugins: [
      new webpack.DefinePlugin({
        CLIENT: JSON.stringify(false),
        SERVER: JSON.stringify(true),
        NODE_ENV: JSON.stringify(mode),
        ASSETS_PATH: JSON.stringify(env.ASSETS_PATH),
        STATS_FILE_PATH: JSON.stringify(
          path.resolve(cwd, env.BUILD_PATH, env.ASSETS_PATH, "stats.json")
        ),
      }),
      new webpack.ProvidePlugin({
        React: "react",
      }),
      ...(mode === "development"
        ? [
            new NodemonPlugin({
              quiet: true,
              script: path.resolve(cwd, env.BUILD_PATH, distFilename),
              watch: [path.resolve(cwd, env.BUILD_PATH, distFilename)],
            }),
          ]
        : []),
    ],
    externals: [nodeExternals()],
  };
};
