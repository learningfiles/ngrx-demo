import { createAction, props } from "@ngrx/store";
import { User } from "src/app/model/user";
import { AuthState } from "./auth.state";

export const LOGIN_CHECK = "[auth page] login check";
export const LOGIN_SUCCESS = "[auth page] login success";
export const LOGIN_FAILURE = "[auth page] login fail";


export const loginCheck = createAction(
  LOGIN_CHECK,
  props<{ email: string, password: string }>()
);

export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  props<{ auth: User }>()
);

export const loginFailure = createAction(
  LOGIN_FAILURE
);
