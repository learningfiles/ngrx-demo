import { createAction, props } from "@ngrx/store";
import { Post } from "src/app/model/post.model";


// TODO: can create enum here
const ADD_POST = '[posts page] add post'
const ADD_POST_SUCCESS = '[posts page] add post success'

const UPDATE_POST = '[posts page] update post'
const UPDATE_POST_SUCCESS = '[posts page] update post success'

const DELETE_POST = '[posts page] delete post'
const DELETE_POST_SUCCESS = '[posts page] delete post success'

const LOAD_ALL_POSTS = '[posts page] load all posts';
const LOAD_ALL_POSTS_SUCCESS = '[posts page] load all posts success';

export const addPost = createAction(
  ADD_POST,
  props<{ post: Post }>()
)

export const addPostSuccess = createAction(
  ADD_POST_SUCCESS,
  props<{ newPost: Post }>()
)

export const updatePost = createAction(
  UPDATE_POST,
  props<{ post: Post }>()
)

export const updatePostSuccess = createAction(
  UPDATE_POST_SUCCESS,
  props<{ updatedPost: Post }>()
)

export const deletePost = createAction(
  DELETE_POST,
  props<{ id: string }>()
)
export const deletePostSuccess = createAction(
  DELETE_POST_SUCCESS,
  props<{ idToBeDeleted: string }>()
)

export const loadAllPosts = createAction(LOAD_ALL_POSTS);

export const loadAllPostsSuccess = createAction(
  LOAD_ALL_POSTS_SUCCESS,
  props<{ posts: Post[] }>()
)
