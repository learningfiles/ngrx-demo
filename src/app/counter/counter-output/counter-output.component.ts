import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { CounterState } from '../state/counter.state';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.scss']
})
export class CounterOutputComponent implements OnInit {


  constructor(private store: Store<{count: CounterState}>) { }

  counter$: Observable<CounterState> = this.store.select('count');

  ngOnInit(): void {
  }

}
