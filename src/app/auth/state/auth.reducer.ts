import { createReducer, on } from "@ngrx/store";
import { loginCheck, loginFailure, loginSuccess, signupSuccess } from "./auth.action";
import { initialAuthState } from "./auth.state";

export const authReducer = createReducer(
  initialAuthState,
  // on(loginCheck, (state, { email, password }) => ({
  //   ...state
  // })),

  on(loginSuccess, (state, { auth }) => ({
    ...state,
    user: auth
  })),

  on(loginFailure, (state) => ({
    ...state
  })),

  on(signupSuccess, (state, { auth }) => ({
    ...state,
    user: auth
  }))
)
