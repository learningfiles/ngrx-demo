import { createReducer, on } from "@ngrx/store";
import { initialPostState } from "./post.state";

export const postReducer = createReducer(
  initialPostState
);

