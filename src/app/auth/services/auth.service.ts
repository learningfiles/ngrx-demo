import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/app-state/app.state';
import { AuthResponse, SignUpResponse } from 'src/app/model/auth-response';
import { User } from 'src/app/model/user';
import { environment } from 'src/environments/environment';
import { autoLogout, logout } from '../state/auth.action';
import { AuthState } from '../state/auth.state';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  logoutTimer: any;

  loginUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';

  signnUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';

  constructor(private http: HttpClient, private store: Store<AppState>) { }

  login(email, password): Observable<User> {
    return this.http.post<AuthResponse>(`${this.loginUrl}${environment.FIRBASE_API_KEY}`, {
      email,
      password,
      returnSecureToken: true
    }).pipe(
      map(response => this.getAsUserFrom(response))
    );
  }

  signUp(email, password): Observable<User> {
    return this.http.post<SignUpResponse>(`${this.signnUrl}${environment.FIRBASE_API_KEY}`, {
      email,
      password,
      returnSecureToken: true
    }).pipe(
      map(response => this.getAsUserFrom(response))
    );
  }

  getAsUserFrom(response: AuthResponse | SignUpResponse) {
    const date = new Date(new Date().getTime() + Number(response.expiresIn) * 1000);
    return new User(response.email, response.idToken, response.localId, date);
  }

  saveUserDataInLocalStorage(user: User) {
    localStorage.setItem('userData', JSON.stringify(user));

    this.runLogoutTimer(user);
  }

  private runLogoutTimer(user: User) {
    const currentTime = new Date().getTime();
    const expTime = user.expdate.getTime();

    const remainingTime = expTime - currentTime;

    //do we need a variable to store this:- yes we need it to clearTimeout() for logout
    this.logoutTimer = setTimeout(() => {
      //logout
      this.store.dispatch(autoLogout());
      console.log('logout');
    }, remainingTime);
  }

  clearLocalStorageAndTimer() {
    localStorage.removeItem('userData');
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
      this.logoutTimer = null;
    }
  }

  getUserFromLocalStorage() {
    let userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const user: User = new User(userData.email, userData.token, userData.userId, new Date(userData.expirationdate));
      this.runLogoutTimer(user);
      return user;
    }
    return null;
  }
}
