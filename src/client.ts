import { createCraqClient, configureContext } from "craq-client";
import react from "craq-react-renderer/dist/client";
import { configureStore } from "@reduxjs/toolkit";

import routes from "./routes";
import bundles from "./bundles";

import { actions, components } from "./registries";
import Application from "./Application";
import testReducer from "./store/testReducer";

const context = configureContext({
  actions,
  components,
  routes,
  store: configureStore({
    reducer: { test: testReducer },
    devTools: true,
    // @ts-ignore
    preloadedState: window.__INITIAL_STATE__,
  }),
});

const options = {
  bundles,
  renderers: { react },
};

createCraqClient(context, Application, options)
  .run(document.location.href)
  .render(document.getElementById("root"));
