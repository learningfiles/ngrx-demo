import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app-state/app.state';
import { Post } from 'src/app/model/post.model';
import { addPost } from '../state/post.actions';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  constructor(private fb: FormBuilder, private store: Store<AppState>) { }

  addPostForm: FormGroup;

  ngOnInit(): void {
    this.addPostForm = this.fb.group({
      title: [null, [Validators.required, Validators.minLength(6)]],
      description: [null, [Validators.required, Validators.minLength(10)]]
    });
  }

  onAddPost() {
    const post: Post = {
      title: this.addPostForm.value.title,
      description: this.addPostForm.value.description
    };

    this.store.dispatch(addPost({ post }))
  }

  showDescriptionErrors() {
    const descriptionControl = this.addPostForm.controls['description'];

    if (descriptionControl.touched && !descriptionControl.valid) {
      if (descriptionControl.errors.required) {
        return 'description is required';
      }

      if (descriptionControl.errors.minlength) {
        return 'description has min lenght of 10 characters';
      }
    }
  }

}
