import { createReducer, on } from "@ngrx/store";
import { autoLogout, loginCheck, loginFailure, loginSuccess, logout, signupSuccess } from "./auth.action";
import { initialAuthState } from "./auth.state";

export const authReducer = createReducer(
  initialAuthState,
  // on(loginCheck, (state, { email, password }) => ({
  //   ...state
  // })),

  on(loginSuccess, signupSuccess, (state, { auth }) => ({
    ...state,
    user: auth
  })),

  on(loginFailure, (state) => ({
    ...state
  })),

  on(logout, autoLogout, state => ({
    ...state,
    user: null
  }))

  // on(signupSuccess, (state, { auth }) => ({
  //   ...state,
  //   user: auth
  // }))
)
