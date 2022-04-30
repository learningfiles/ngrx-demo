import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CounterState } from "./counter.state";

const getCounterState = createFeatureSelector<CounterState>('count');

export const getCounter = createSelector(getCounterState, state => state.counter)

export const getCounterName = createSelector(getCounterState, state => state.counterName);
