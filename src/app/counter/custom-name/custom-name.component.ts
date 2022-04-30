import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { changeCounterName } from '../state/counter.actions';
import { getCounterName } from '../state/counter.selectors';
import { CounterState } from '../state/counter.state';

@Component({
  selector: 'app-custom-name',
  templateUrl: './custom-name.component.html',
  styleUrls: ['./custom-name.component.scss']
})
export class CustomNameComponent implements OnInit {

  counterName$: Observable<string> = this.store.select(getCounterName);

  constructor(private store: Store<{count: CounterState}>) { }

  ngOnInit(): void {
  }

  onChangeCounterName() {
    this.store.dispatch(changeCounterName());
  }

}
