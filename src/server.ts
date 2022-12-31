import fs from "fs";
import { createCraqServer, configureContext } from "craq-server";
import react from "craq-react-renderer/dist/server";

import routes from "./routes";
import bundles from "./bundles";

import { actions, components } from "./registries";
import Application from "./Application";
import testReducer from "./store/testReducer";

const context = configureContext({
  actions,
  components,
  routes,
  reducers: { test: testReducer },
});

const options = {
  bundles,
  renderers: { react },
  options: {
    assetsPath: ASSETS_PATH,
    statsFile: {
      content: JSON.parse(fs.readFileSync(STATS_FILE_PATH).toString())
        .assetsByChunkName,
    },
  },
};

createCraqServer(context, Application, options).listen(3001);
