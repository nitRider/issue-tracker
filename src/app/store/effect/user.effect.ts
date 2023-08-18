import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import * as fromActions from '../action/user.action';
import { SessionStorageService } from '../session/session-store.service';
import { UserState } from '../state/data.state';

@Injectable()
export class UserEffect {
  constructor(
    private actions$: Actions,
    private service: ApiService,
    private sessionStorageService: SessionStorageService,
    private store: Store<{ user: UserState }>
  ) {}

  /**
   * user effect
   */
  userData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadUser),
      mergeMap(() =>
        this.service.getUserList().pipe(
          map((data) => fromActions.loadUserSuccess({ data })),
          catchError((error) =>
            of(fromActions.loadUserFailure({ error: error.message }))
          )
        )
      )
    )
  );

  /**
   * store data in local session storage
   */

  // loadUserDataFromSessionStorage$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType('[data] Load User'), // This could be the action that triggers loading on app initialization
  //     map(() => {
  //       const data = this.sessionStorageService.getItem('users');
  //       return fromActions.loadUser({ data });
  //     })
  //   )
  // );

  // storeUserDataInSessionStorage$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType('[data] Load User'), // Listen for the 'init' action
  //       withLatestFrom(this.store.select('user')),
  //       tap(([action, user]) => {
  //         this.sessionStorageService.setItem('users', user);
  //       })
  //     ),
  //   { dispatch: false } // We don't want to dispatch any additional actions from this effect
  // );
}
