import { CraqAction, createRegistry } from "craq";

export const actions = createRegistry<CraqAction<any, any>>();
export const components = createRegistry();
