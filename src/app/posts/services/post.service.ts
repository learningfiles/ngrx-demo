import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { PostResponse } from "src/app/model/post-response";
import { Post } from "src/app/model/post.model";

const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<PostResponse[]>(apiUrl).pipe(
      map(postResponses => postResponses.map(postResponse => ({ id: postResponse.id, title: postResponse.title, description: postResponse.body })))
    );
  }

  addPost(post: Post): Observable<Post> {
    return this.http.post<PostResponse>(apiUrl, {
      ...post,
      userId: 1
    }).pipe(
      map(data => ({ id: data.id, title: data.title, description: data.body }))
    );
  }

  updatePost(post: Post) {
    const postsRequest: PostResponse = { id: post.id, body: post.description, title: post.title, userId: 1 };

    return this.http.patch(`${apiUrl}/${post.id}`, postsRequest);
  }

  deletePost(id: string) {
    return this.http.delete(`${apiUrl}/${id}`);
  }
}
