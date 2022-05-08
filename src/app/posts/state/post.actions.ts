import { createAction, props } from "@ngrx/store";
import { Post } from "src/app/model/post.model";


// TODO: can create enum here
const ADD_POST_ACTION = '[posts page] add post'
const UPDATE_POST_ACTION = '[posts page] update post'
const DELETE_POST_ACTION = '[posts page] delete post'

export const addPost = createAction(
  ADD_POST_ACTION,
  props<{newPost: Post}>()
)

export const updatePost = createAction(
  UPDATE_POST_ACTION,
  props<{updatedPost: Post}>()
)

export const deletePost = createAction(
  DELETE_POST_ACTION,
  props<{idToBeDeleted: string}>()
)
