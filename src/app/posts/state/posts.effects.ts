import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, concatMap, exhaustMap, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { AppState } from 'src/app/app-state/app.state';
import { Post } from 'src/app/model/post.model';
import { toggleSpinner } from 'src/app/shared/state/shared.actions';
import { PostsService } from '../services/post.service';
import { addPost, addPostSuccess, deletePost, deletePostSuccess, loadAllPosts, loadAllPostsSuccess, updatePost, updatePostSuccess } from './post.actions';


@Injectable()
export class PostEffects {

  constructor(private actions$: Actions, private postsService: PostsService, private store: Store<AppState>) { }

  loadAllPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadAllPosts),
      exhaustMap(action => {
        return this.postsService.getAllPosts().pipe(
          //tap(console.log)
          map(posts => {
            this.store.dispatch(toggleSpinner());
            return loadAllPostsSuccess({ posts });
          }),
          // catchError(error => {
          //   this.store.dispatch(toggleSpinner({ show: false }));
          //   const error = getError() somehow
          //   return of(showErrorMessage(error))
          // })
        )
      })
    )
  });


  savePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addPost),
      concatMap(({ post }) => {
        return this.postsService.addPost(post).pipe(
          map((post: Post) => {
            this.store.dispatch(toggleSpinner());
            return addPostSuccess({ newPost: post });
          })
        )
      })
    )
  });

  updatePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updatePost),
      concatMap(action => {
        return this.postsService.updatePost(action.post).pipe(
          map(post => updatePostSuccess({ updatedPost: action.post }))
        )
      })
    )
  });
  deletePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deletePost),
      mergeMap(action => {
        return this.postsService.deletePost(action.id).pipe(
          map(post => deletePostSuccess({ idToBeDeleted: action.id }))
        )
      })
    )
  });
}

