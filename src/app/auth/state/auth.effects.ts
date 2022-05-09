import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, filter, map, switchMap, tap } from "rxjs/operators";
import { AppState } from "src/app/app-state/app.state";
import { saveErrorMsg, toggleSpinner } from "src/app/shared/state/shared.actions";
import { AuthService } from "../services/auth.service";
import { autoLogin, autoLogout, loginCheck, loginFailure, loginSuccess, logout, signupCheck, signupSuccess } from "./auth.action";

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService, private store: Store<AppState>,
    private router: Router) { }

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginCheck),
      switchMap(action => {
        return this.authService.login(action.email, action.password).pipe(
          map(data => {
            this.store.dispatch(toggleSpinner());
            this.authService.saveUserDataInLocalStorage(data);
            return loginSuccess({ auth: data, canRedirectToHome: true });
          }),
          catchError(errResponse => {
            this.store.dispatch(toggleSpinner());
            const errorMsg = errResponse.error.error.message;
            return of(saveErrorMsg({ errorMsg }));
          })
        )
      })
    );
  });

  loginOrSignUpRedirect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginSuccess, signupSuccess),
      tap(action => {
        if (action.canRedirectToHome) {
          this.router.navigate(['/']);
        }
      })
    )
  }, { dispatch: false });

  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signupCheck),
      switchMap(({ email, password }) => this.authService.signUp(email, password).pipe(
        map(user => {
          this.store.dispatch(toggleSpinner());
          this.authService.saveUserDataInLocalStorage(user);
          return signupSuccess({ auth: user, canRedirectToHome: true });
        }),
        catchError(errResponse => {
          this.store.dispatch(toggleSpinner());
          const errorMsg = errResponse.error.error.message;
          return of(saveErrorMsg({ errorMsg }));
        })
      ))
    )
  });

  autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(autoLogin),
      map(action => this.authService.getUserFromLocalStorage()),
      filter(user => !!user),
      switchMap(user => {
        console.log('user from storage:- ', user);
        return of(loginSuccess({ auth: user, canRedirectToHome: false }));
      })
    )
  });

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(logout, autoLogout),
      tap(_ => {
        this.authService.clearLocalStorageAndTimer();
        this.router.navigate(['/auth']);
      })
    )
  }, { dispatch: false })

}
