import { IsomorphicNavigateCraqAction } from "../types";

const updateMetaAction: IsomorphicNavigateCraqAction = (context, { route }) => {
  context.head.setTitle(route.name);
  context.head.addMeta({ name: "description", content: "ok" + route.name });
};

export default updateMetaAction;
