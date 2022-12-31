import { createCraqClient, configureContext } from "craq-client";
import react from "craq-react-renderer/dist/client";

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
};

createCraqClient(context, Application, options)
  .run(document.location.href)
  .render(document.getElementById("root"));
