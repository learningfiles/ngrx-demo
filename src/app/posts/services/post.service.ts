import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { PostResponse } from "src/app/model/post-response";
import { Post } from "src/app/model/post.model";

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<PostResponse>('http://vue-completecourse.firebaseio.com/posts.json').pipe(
      map(postResponses =>
        Object.entries(postResponses)
          .map(([id, value]) => ({ id, title: value.title, description: value.description }))
          .filter(post => post.title)
      )
    );
  }

  addPost(post: Post): Observable<Post> {
    return this.http.post<{ name: string }>('http://vue-completecourse.firebaseio.com/posts.json', post).pipe(
      map(data => ({ id: data.name, title: post.title, description: post.description }))
    );
  }

  updatePost(post: Post) {
    const postsRequest = { [post.id]: { title: post.title, description: post.description } };

    return this.http.patch('http://vue-completecourse.firebaseio.com/posts.json', postsRequest);
  }

  deletePost(id: string) {
    return this.http.delete('http://vue-completecourse.firebaseio.com/posts.json?id=' + id);
  }
}
