import { CraqAction } from "craq";
import { increment } from "../store/testReducer";

const incrementAction: CraqAction<any, any> = (context) =>
  context.dispatch(increment());

export default incrementAction;
