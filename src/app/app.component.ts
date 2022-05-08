import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from './app-state/app.state';
import { autoLogin } from './auth/state/auth.action';
import { getErrorMsg, getSpinnerState } from './shared/state/shared.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'learning-store';

  constructor(private store: Store<AppState>) { }

  showLoading$: Observable<boolean> = this.store.select(getSpinnerState);

  errorMsg$ = this.store.select(getErrorMsg);

  ngOnInit(): void {
    this.store.dispatch(autoLogin());
  }
}
