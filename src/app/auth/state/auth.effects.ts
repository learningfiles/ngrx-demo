import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap } from "rxjs/operators";
import { AuthService } from "../services/auth.service";
import { loginCheck, loginSuccess } from "./auth.action";

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) { }

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginCheck),
      switchMap(action => {
        return this.authService.login(action.email, action.password).pipe(
          map(data => loginSuccess({ auth: data }))
        )
      })
    );
  });
}
