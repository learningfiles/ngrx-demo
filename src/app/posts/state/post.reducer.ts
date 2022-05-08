import { createReducer, on } from "@ngrx/store";
import { Post } from "src/app/model/post.model";
import { addPost, addPostSuccess, deletePost, deletePostSuccess, loadAllPostsSuccess, updatePost, updatePostSuccess } from "./post.actions";
import { initialPostState } from "./post.state";

export const postReducer = createReducer(
  initialPostState,
  on(addPostSuccess, (state, action) => {

    let newPost: Post = { ...action.newPost };
    //newPost.id = (state.posts.length + 1).toString();
    return {
      ...state,
      posts: [...state.posts, newPost]
    }

  }),
  on(updatePostSuccess, (state, { updatedPost }) => {

    const updatedPOsts = state.posts.map(post => post.id === updatedPost.id ? updatedPost : post);
    return {
      ...state,
      posts: updatedPOsts
    }

  }),
  on(deletePostSuccess, (state, { idToBeDeleted }) => {

    return {
      ...state,
      posts: state.posts.filter(post => post.id !== idToBeDeleted)
    }
  }),

  on(loadAllPostsSuccess, (state, { posts }) => ({
    ...state,
    posts
  }))
);

