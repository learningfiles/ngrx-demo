import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SharedState } from "./shared.state";

const getSharedState = createFeatureSelector<SharedState>('shared');

export const getSpinnerState = createSelector(getSharedState, state => state.showLoading);

export const getErrorMsg = createSelector(getSharedState, state => state.errorMsg);
