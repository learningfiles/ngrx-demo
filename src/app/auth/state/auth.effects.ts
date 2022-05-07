import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { AppState } from "src/app/app-state/app.state";
import { saveErrorMsg, toggleSpinner } from "src/app/shared/state/shared.actions";
import { AuthService } from "../services/auth.service";
import { autoLogin, loginCheck, loginFailure, loginSuccess, signupCheck, signupSuccess } from "./auth.action";

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
            this.store.dispatch(toggleSpinner({ show: false }));
            this.authService.saveUserDataInLocalStorage(data);
            return loginSuccess({ auth: data });
          }),
          catchError(errResponse => {
            this.store.dispatch(toggleSpinner({ show: false }));
            const errorMsg = errResponse.error.error.message;
            return of(saveErrorMsg({ errorMsg }));
          })
        )
      })
    );
  });

  loginOrSignUpRedirect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(...[loginSuccess, signupSuccess]),
      tap(action => this.router.navigate(['/']))
    )
  }, { dispatch: false });

  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signupCheck),
      switchMap(({ email, password }) => this.authService.signUp(email, password).pipe(
        map(user => {
          this.store.dispatch(toggleSpinner({ show: false }));
          this.authService.saveUserDataInLocalStorage(user);
          return signupSuccess({ auth: user });
        }),
        catchError(errResponse => {
          this.store.dispatch(toggleSpinner({ show: false }));
          const errorMsg = errResponse.error.error.message;
          return of(saveErrorMsg({ errorMsg }));
        })
      ))
    )
  });

  autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(autoLogin),
      switchMap(action => {
        const user = this.authService.getUserFromLocalStorage();
        return of(loginSuccess({ auth: user }));
      })
    )
  })

}
