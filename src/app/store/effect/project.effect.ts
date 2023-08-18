import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import * as fromActions from '../action/project.action';
import { SessionStorageService } from '../session/session-store.service';
import { DataState } from '../state/data.state';

@Injectable()
export class ProjectEffect {
  constructor(
    private actions$: Actions,
    private service: ApiService,
    private sessionStorageService: SessionStorageService,
    private store: Store<{ project: DataState }>
  ) {}

  /**
   * project effect
   */
  projectData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadProjects),
      mergeMap(() =>
        this.service.getProjectList().pipe(
          map((data) => fromActions.loadProjectsSuccess({ data })),
          catchError((error) =>
            of(fromActions.loadProjectsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  //store data in session storage
  // loadItemsFromSessionStorage$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType('[Data] Init'), // This could be the action that triggers loading on app initialization
  //     map(() => {
  //       const data = this.sessionStorageService.getItem('item');
  //       return fromActions.initProject({ data });
  //     })
  //   )
  // );

  // storeItemInSessionStorage$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType('[Data] Init'), // Listen for the 'init' action
  //       withLatestFrom(this.store.select('project')),
  //       tap(([action, project]) => {
  //         this.sessionStorageService.setItem('items', project);
  //       })
  //     ),
  //   { dispatch: false } // We don't want to dispatch any additional actions from this effect
  // );
  /**
   * comment effect
   */
}
