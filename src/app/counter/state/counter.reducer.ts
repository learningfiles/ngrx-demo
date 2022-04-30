import { createReducer, on } from "@ngrx/store";
import { decrement, increment, reset } from "./counter.actions";
import { initialState } from "./counter.state";

export const counterReducer = createReducer(
  initialState,
  on(increment, state => {
    console.log('old state:- ', state);
    return {
      ...state,
      counter: state.counter + 1
    }
  }),
  on(decrement, state => ({
    ...state,
    counter: state.counter - 1
  })),
  on(reset, state => ({
    ...state,
    counter: 0
  }))
);

