import { createAction, createReducer } from "@reduxjs/toolkit";

export const increment = createAction("counter/increment");
const decrement = createAction("counter/decrement");
const incrementByAmount = createAction<number>("counter/incrementByAmount");

const testReducer = createReducer({ some: { test: 1 } }, (reducer) => {
  reducer
    .addCase(increment, (state, action) => {
      state.some.test++;
    })
    .addCase(decrement, (state, action) => {
      state.some.test--;
    })
    .addCase(incrementByAmount, (state, action) => {
      state.some.test += action.payload;
    });
});

export default testReducer;
