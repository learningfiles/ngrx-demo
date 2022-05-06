import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthResponse } from 'src/app/model/auth-response';
import { User } from 'src/app/model/user';
import { environment } from 'src/environments/environment';
import { AuthState } from '../state/auth.state';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';

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

  getAsUserFrom(response: AuthResponse) {
    const date = new Date(new Date().getTime() + Number(response.expiresIn) * 1000);
    return new User(response.email, response.idToken, response.localId, date);
  }
}
