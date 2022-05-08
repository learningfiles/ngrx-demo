import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app-state/app.state';
import { Post } from 'src/app/model/post.model';
import { deletePost } from '../state/post.actions';
import { getPosts } from '../state/posts.selector';

@Component({
  selector: 'app-postslist',
  templateUrl: './postslist.component.html',
  styleUrls: ['./postslist.component.scss']
})
export class PostslistComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  posts$: Observable<Post[]> = this.store.select(getPosts);

  ngOnInit(): void {
  }

  onDelete(id) {
    this.store.dispatch(deletePost({idToBeDeleted: id}));
  }

}
