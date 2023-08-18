import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import * as fromActions from '../action/comment.action';
import { SessionStorageService } from '../session/session-store.service';

@Injectable()
export class CommentEffect {
  constructor(
    private actions$: Actions,
    private service: ApiService,
    private sessionStorageService: SessionStorageService,
    private store: Store
  ) {}

  /**
   * user effect
   */
  userData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadComment),
      mergeMap((action) =>
        this.service.getCommentList(action.projectID, action.issueID).pipe(
          map((data) => fromActions.loadCommentSuccess({ data })),
          catchError((error) =>
            of(fromActions.loadCommentFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
