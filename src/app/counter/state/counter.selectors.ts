import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppStates } from "src/app/app-state/app.state";
import { CounterState } from "./counter.state";

const getCounterState = createFeatureSelector<CounterState>(AppStates.counter);

export const getCounter = createSelector(getCounterState, state => state.counter)

export const getCounterName = createSelector(getCounterState, state => state.counterName);
