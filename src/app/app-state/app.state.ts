import { counterReducer } from "../counter/state/counter.reducer";
import { CounterState } from "../counter/state/counter.state";
import { postReducer } from "../posts/state/post.reducer";
import { PostState } from "../posts/state/post.state";

export interface AppState {
  count: CounterState;
  posts: PostState;
}

export const appReaducers = {
  count: counterReducer,
  posts: postReducer
}

export enum AppStates {
  counter = 'count',
  posts = 'posts'
}
