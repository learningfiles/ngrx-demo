import { createReducer, on } from "@ngrx/store";
import { saveErrorMsg, toggleSpinner } from "./shared.actions";
import { initialSharedState } from "./shared.state";

export const sharedReducer = createReducer(
  initialSharedState,

  on(toggleSpinner, (state, { show }) => ({
    ...state,
    showLoading: show
  })),

  on(saveErrorMsg, (state, { errorMsg }) => ({
    ...state,
    errorMsg
  }))
)
