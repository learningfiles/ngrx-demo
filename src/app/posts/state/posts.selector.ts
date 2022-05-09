import { RouterReducerState } from "@ngrx/router-store";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppStates } from "src/app/app-state/app.state";
import { RouterStateUrl } from "src/app/router-state-config/custom-serializer";
import { getParams } from "src/app/router-state-config/router-selectors";
import { PostState } from "./post.state";

const getPostsState = createFeatureSelector<PostState>(AppStates.posts);

export const getPosts = createSelector(getPostsState, state => state.posts);

export const getPostById = createSelector(
  getPosts,
  getParams,
  (posts, params) => {
    return posts ? posts.find(post => post.id == params.id) : null;
  })


