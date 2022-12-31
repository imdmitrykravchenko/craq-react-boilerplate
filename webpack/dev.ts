import webpack, { Configuration } from "webpack";
import WebpackDevServer from "webpack-dev-server";
import redbird from "redbird";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, ".env") });

import getClientConfig from "./client.config";
import getServerConfig from "./server.config";

const getRunnerWith =
  (
    getConfig: (
      env: Record<string, string>,
      params: { mode: Configuration["mode"] }
    ) => Configuration
  ) =>
  () =>
    new Promise<void>((resolve, reject) => {
      const config = getConfig(process.env, { mode: "development" });
      const { devServer } = config;
      const compiler = webpack(config, (err) => {
        if (err) {
          reject(err);
        }

        if (devServer) {
          resolve(new WebpackDevServer(devServer, compiler).start());
        } else {
          resolve();
        }
      });
    });

const runProxy = () => {
  const { HOSTNAME, PORT, ASSETS_PATH } = process.env;
  const proxy = redbird({ port: PORT, bunyan: false });
  const url = `http://${HOSTNAME}:${PORT}`;
  const localhost = "http://localhost";

  proxy.register(`${url}/${ASSETS_PATH}`, `${localhost}:3000/${ASSETS_PATH}`);
  proxy.register(url, `${localhost}:3001/`);

  console.info(`SSR available at ${url}`);
};

Promise.resolve()
  .then(getRunnerWith(getClientConfig))
  .then(getRunnerWith(getServerConfig))
  .then(runProxy);
