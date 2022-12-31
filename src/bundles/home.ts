import { actions, components } from "../registries";
import HomePage from "../pages/Home";
import updateMetaAction from "../actions/updateMeta";

components.register("page/HomePage", HomePage);
actions.register("updateMetaAction", updateMetaAction);
