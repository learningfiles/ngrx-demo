import { createReducer, on } from "@ngrx/store";
import { changeCounterName, customIncrement, decrement, increment, reset } from "./counter.actions";
import { initialState } from "./counter.state";

export const counterReducer = createReducer(
  initialState,
  on(increment, state => ({
      ...state,
      counter: state.counter + 1
    })),
  on(decrement, state => ({
    ...state,
    counter: state.counter - 1
  })),
  on(reset, state => ({
    ...state,
    counter: 0
  })),
  on(customIncrement, (state,action) => ({
    ...state,
    counter: state.counter + action.value
  })),
  on(changeCounterName, state => ({
    ...state,
    counterName: 'counter-2'
  }))
);

