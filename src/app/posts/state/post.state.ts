import { Post } from "src/app/model/post.model";


export interface PostState {
  posts: Post[];
}

export const initialPostState: PostState = {
  posts: [
    {id: '1', title: 'some title 1', description: 'some desc 1'},
    {id: '2', title: 'some title 2', description: 'some desc 2'},
  ]
}
