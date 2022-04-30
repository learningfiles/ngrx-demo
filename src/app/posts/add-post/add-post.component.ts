import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  addPostForm: FormGroup;

  ngOnInit(): void {
    this.addPostForm = this.fb.group({
      title: [null, [Validators.required, Validators.minLength(6)]],
      description: [null, [Validators.required, Validators.minLength(10)]]
    });
  }

  onAddPost() {
    console.log(this.addPostForm);
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
