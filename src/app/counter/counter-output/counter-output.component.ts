import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.scss']
})
export class CounterOutputComponent implements OnInit {

  // @Input()
  // counter;

  counter;

  constructor(private store: Store<{count: {counter: number}}>) { }

  ngOnInit(): void {
    this.store.select('count').subscribe(data => {
      console.log('value from store:- ', data);
      this.counter = data.counter;
    });
  }

}
