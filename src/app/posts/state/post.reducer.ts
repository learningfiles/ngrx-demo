import { createReducer, on } from "@ngrx/store";
import { Post } from "src/app/model/post.model";
import { addPost, deletePost, updatePost } from "./post.actions";
import { initialPostState } from "./post.state";

export const postReducer = createReducer(
  initialPostState,
  on(addPost, (state, action) => {

    let newPost: Post = {...action.newPost};
    newPost.id = (state.posts.length + 1).toString();
    return {
      ...state,
      posts: [...state.posts, newPost]
    }

  }),
  on(updatePost, (state, {updatedPost}) => {

    const updatedPOsts = state.posts.map(post => post.id === updatedPost.id ? updatedPost : post);
    return {
      ...state,
      posts: updatedPOsts
    }

  }),
  on(deletePost, (state, {idToBeDeleted}) => {

    return {
      ...state,
      posts: state.posts.filter(post => post.id !== idToBeDeleted)
    }
  })
);

