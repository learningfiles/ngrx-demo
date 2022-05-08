import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app-state/app.state';
import { logout } from 'src/app/auth/state/auth.action';
import { isAuthenticated } from 'src/app/auth/state/auth.selector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  isAuthenticated$ = this.store.select(isAuthenticated);

  ngOnInit(): void {
  }

  onLogout(event: Event) {
    event.preventDefault();
    this.store.dispatch(logout());
  }

}
