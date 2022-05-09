import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app-state/app.state';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { getPostById, getPosts } from '../state/posts.selector';
import { combineLatest } from 'rxjs';
import { Post } from 'src/app/model/post.model';
import { updatePost } from '../state/post.actions';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {

  constructor(private fb: FormBuilder, private store: Store<AppState>) { }

  updatePostForm: FormGroup;


  // as we have params present in our store we can use that directly
  // so we can avoid using activatedRoute in our component

  // selectedPostOld$ = this.route.paramMap.pipe(
  //   map(paramMap => paramMap.get('id')),
  //   switchMap(id => this.store.select(getPostById, { id: id })),
  //   filter(val => !!val),
  //   tap(post => this.initFormWith(post))
  // );

  selectedPost$ = this.store.select(getPostById).pipe(
    filter(val => !!val),
    tap(post => this.initFormWith(post))
  );

  ngOnInit(): void {
  }

  initFormWith(post: Post) {
    this.updatePostForm = this.fb.group({
      title: [post.title, [Validators.required, Validators.minLength(6)]],
      description: [post.description, [Validators.required, Validators.minLength(10)]]
    });
  }

  showDescriptionErrors() {
    const descriptionControl = this.updatePostForm.controls['description'];

    if (descriptionControl.touched && !descriptionControl.valid) {
      if (descriptionControl.errors.required) {
        return 'description is required';
      }

      if (descriptionControl.errors.minlength) {
        return 'description has min lenght of 10 characters';
      }
    }
  }

  onUpdatePost(id) {
    const updatedPost: Post = {
      id,
      title: this.updatePostForm.value.title,
      description: this.updatePostForm.value.description
    };
    this.store.dispatch(updatePost({ post: updatedPost }));
  }

}
