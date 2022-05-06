import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { AppStates } from "../app-state/app.state";
import { CounterButtonsComponent } from "./counter-buttons/counter-buttons.component";
import { CounterOutputComponent } from "./counter-output/counter-output.component";
import { CounterComponent } from "./counter/counter.component";
import { CustomCounterInputComponent } from "./custom-counter-input/custom-counter-input.component";
import { CustomNameComponent } from "./custom-name/custom-name.component";
import { counterReducer } from "./state/counter.reducer";

const routes: Routes = [
  { path: '', component: CounterComponent },
]

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes),
    StoreModule.forFeature(AppStates.counter, counterReducer)],
  declarations: [
    CounterComponent,
    CounterOutputComponent,
    CounterButtonsComponent,
    CustomCounterInputComponent,
    CustomNameComponent,
  ]
})
export class CounterModule {

}