import { RouterReducerState } from "@ngrx/router-store";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RouterStateUrl } from "./custom-serializer";

const getRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');

export const getState = createSelector(getRouterState, state => state.state);

export const getParams = createSelector(getState, state => state.params);
