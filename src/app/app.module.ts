import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CounterComponent } from './counter/counter/counter.component';
import { CounterOutputComponent } from './counter/counter-output/counter-output.component';
import { CounterButtonsComponent } from './counter/counter-buttons/counter-buttons.component';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './counter/state/counter.reducer';
import { CustomCounterInputComponent } from './counter/custom-counter-input/custom-counter-input.component';
import { FormsModule } from '@angular/forms';
import { CustomNameComponent } from './counter/custom-name/custom-name.component';

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    CounterOutputComponent,
    CounterButtonsComponent,
    CustomCounterInputComponent,
    CustomNameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot({count: counterReducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
