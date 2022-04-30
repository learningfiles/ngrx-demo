import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app-state/app.state';
import { customIncrement } from '../state/counter.actions';

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: ['./custom-counter-input.component.scss']
})
export class CustomCounterInputComponent implements OnInit {

  value: number;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  onCustomIncrement() {
    this.store.dispatch(customIncrement({value: Number(this.value)}));
  }
}
