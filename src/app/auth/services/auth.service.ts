import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthResponse, SignUpResponse } from 'src/app/model/auth-response';
import { User } from 'src/app/model/user';
import { environment } from 'src/environments/environment';
import { AuthState } from '../state/auth.state';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';

  signnUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';

  constructor(private http: HttpClient) { }

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

    //do we need a variable to store this
    setTimeout(() => {
      //logout
      console.log('logout');
    }, remainingTime);
  }

  getUserFromLocalStorage() {
    let userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const user: User = new User(userData.email, userData.idToken, userData.localId, new Date(userData.expirationdate));
      return user;
    }
    return null;
  }
}
