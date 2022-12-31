import { CraqAction } from "craq";
import { increment } from "../store/testReducer";

const incrementAction: CraqAction = (context) => context.dispatch(increment());

export default incrementAction;
