import { Post } from "src/app/model/post.model";


export interface PostState {
  posts: Post[];
}

export const initialPostState: PostState = {
  posts: null
}
