import { createAction, props } from "@ngrx/store";
import { User } from "src/app/model/user";
import { AuthState } from "./auth.state";

export const LOGIN_CHECK = "[auth page] login check";
export const LOGIN_SUCCESS = "[auth page] login success";
export const LOGIN_FAILURE = "[auth page] login fail";

export const SIGNUP_CHECK = "[auth page] signup check";
export const SIGNUP_SUCCESS = "[auth page] signup success";

export const AUTO_LOGIN = "[auth page] auto login";

export const LOGOUT = "[auth page] logout";
export const AUTO_LOGOUT = "[auth page] auto logout";

export const loginCheck = createAction(
  LOGIN_CHECK,
  props<{ email: string, password: string }>()
);

export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  props<{ auth: User, canRedirectToHome: boolean }>()
);

export const loginFailure = createAction(
  LOGIN_FAILURE
);

export const signupCheck = createAction(
  SIGNUP_CHECK,
  props<{ email: string, password: string }>()
)

export const signupSuccess = createAction(
  SIGNUP_SUCCESS,
  props<{ auth: User, canRedirectToHome: boolean }>()
)

export const autoLogin = createAction(AUTO_LOGIN);

export const logout = createAction(LOGOUT);

export const autoLogout = createAction(AUTO_LOGOUT);
