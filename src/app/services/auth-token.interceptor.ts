import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { exhaustMap, switchMap, take, tap } from 'rxjs/operators';
import { AppState } from '../app-state/app.state';
import { getToken } from '../auth/state/auth.selector';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

  constructor(private store: Store<AppState>) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // for evry request a stream started and we want to complete that stream once that request
    // happened so using take(1)
    return this.store.select(getToken).pipe(
      take(1),
      //tap(data => console.log(`${req.url} and token:- ${data}`)),
      exhaustMap(token => {
        if (!token) {
          return next.handle(req);
        }
        let modifiedreq = req.clone({
          params: req.params.append('auth', token)
        })
        return next.handle(modifiedreq);
      })
    )
  }
}
