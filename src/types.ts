import { ClientNavigateCraqAction } from "craq-client";
import { ServerNavigateCraqAction } from "craq-server";

export type IsomorphicNavigateCraqAction<T = {}> =
  | ClientNavigateCraqAction<T>
  | ServerNavigateCraqAction<T>;
