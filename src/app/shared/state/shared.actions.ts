import { createAction, props } from "@ngrx/store";

export const TOGGLE_LOADING_SPINNER = '[shared state] toggle loading spinner';
export const SAVE_ERROR_MSG = '[shared state] save error msg';

export const toggleSpinner = createAction(
  TOGGLE_LOADING_SPINNER
)

export const saveErrorMsg = createAction(
  SAVE_ERROR_MSG,
  props<{ errorMsg: string }>()
)
