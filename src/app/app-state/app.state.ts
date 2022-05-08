import { authReducer } from "../auth/state/auth.reducer";
import { AUTH_STATE_NAME } from "../auth/state/auth.selector";
import { AuthState } from "../auth/state/auth.state";
import { counterReducer } from "../counter/state/counter.reducer";
import { CounterState } from "../counter/state/counter.state";
import { postReducer } from "../posts/state/post.reducer";
import { PostState } from "../posts/state/post.state";
import { sharedReducer } from "../shared/state/shared.reducer";
import { SharedState } from "../shared/state/shared.state";

export interface AppState {
  // count: CounterState;
  // posts: PostState;
  // auth: AuthState;
  shared: SharedState;
  [AUTH_STATE_NAME]: AuthState;
}

export const appReducers = {
  // count: counterReducer,
  // posts: postReducer
  shared: sharedReducer,
  [AUTH_STATE_NAME]: authReducer
}

export enum AppStates {
  counter = 'count',
  posts = 'posts'
}
