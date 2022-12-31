import webpack from "webpack";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, ".env") });

import getClientConfig from "./client.config";
import getServerConfig from "./server.config";

const getRunnerWith = (getConfig) => () =>
  new Promise<void>((resolve, reject) => {
    const compiler = webpack(getConfig(process.env, { mode: "production" }));

    compiler.run((err, stats) => {
      compiler.close(() => {
        if (err || stats.hasErrors()) {
          reject(err || stats.compilation.errors);
        }
        resolve();
      });
    });
  });

Promise.resolve()
  .then(getRunnerWith(getClientConfig))
  .then(getRunnerWith(getServerConfig))
  .then(
    () => {
      console.info("Build succeed!");
    },
    (errors) => {
      errors
        .map((e) => e.stack.split(/\n/).slice(0, 2).join(":"))
        .forEach((c) => console.error(c));

      throw new Error("Build failed!");
    }
  );
