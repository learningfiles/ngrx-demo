import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { AppStates } from "../app-state/app.state";
import { AddPostComponent } from "./add-post/add-post.component";
import { EditPostComponent } from "./edit-post/edit-post.component";
import { PostslistComponent } from "./postslist/postslist.component";
import { postReducer } from "./state/post.reducer";

const routes: Routes = [
  {
    path: '',
    component: PostslistComponent,
    children: [
      { path: 'add', component: AddPostComponent },
      { path: 'edit/:id', component: EditPostComponent },
    ]
  }
];

@NgModule({
  imports: [CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(AppStates.posts, postReducer)
  ],
  declarations: [
    PostslistComponent,
    AddPostComponent,
    EditPostComponent
  ]
})
export class PostModule {

}
