import path from "path";

import webpack, { Configuration } from "webpack";
import { StatsWriterPlugin } from "webpack-stats-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

import rules from "./rules";

export default (
  env: Record<string, string>,
  { mode = "development" }: { mode: Configuration["mode"] }
): Configuration => {
  const cwd = process.cwd();
  const filename = `[name]${mode === "production" ? ".[contenthash]" : ""}`;

  return {
    mode,
    entry: {
      bundle: path.resolve(cwd, env.SRC_PATH, "client.ts"),
    },
    devtool: `${mode === "development" ? "eval-cheap-" : ""}source-map`,
    module: {
      rules: rules(false, MiniCssExtractPlugin.loader),
    },
    plugins: [
      new webpack.DefinePlugin({
        CLIENT: JSON.stringify(true),
        SERVER: JSON.stringify(false),
        NODE_ENV: JSON.stringify(mode),
      }),
      new webpack.ProvidePlugin({
        React: "react",
      }),
      new MiniCssExtractPlugin({ filename: `${filename}.css` }),
      new StatsWriterPlugin({ filename: "stats.json" }),
    ],
    resolve: {
      fallback: {
        assert: false,
        buffer: false,
        console: false,
        child_process: false,
        constants: false,
        module: false,
        crypto: false,
        domain: false,
        events: false,
        http: false,
        https: false,
        fs: false,
        os: false,
        path: false,
        punycode: false,
        process: false,
        querystring: false,
        stream: false,
        string_decoder: false,
        sys: false,
        timers: false,
        tty: false,
        url: false,
        util: false,
        vm: false,
        zlib: false,
      },
      extensions: [".tsx", ".ts", ".js"],
    },
    infrastructureLogging: {
      level: mode === "development" ? "error" : "verbose",
    },
    stats: mode === "development" ? "errors-only" : "verbose",
    output: {
      publicPath: `/${env.ASSETS_PATH}`,
      path: path.resolve(cwd, env.BUILD_PATH, env.ASSETS_PATH),
      filename: `${filename}.js`,
    },
    optimization: {
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          vendor: {
            test: /node_modules/,
            name: "vendor",
            reuseExistingChunk: true,
          },
        },
      },
    },
    ...(mode === "development" && {
      devServer: {
        port: 3000,
        bonjour: false,
        static: false,
        devMiddleware: {
          stats: "none",
          writeToDisk: (file) => file.endsWith("stats.json"),
        },
      },
    }),
  };
};
