import { createAction, props } from '@ngrx/store';

/**
 * comment action
 */
export const loadComment = createAction(
  '[data] Load Comment',
  props<{ projectID: string; issueID: string }>()
);
export const loadCommentSuccess = createAction(
  '[data] Load Data Success',
  props<{ data: any[] }>()
);
export const loadCommentFailure = createAction(
  '[data] Load Data Failure',
  props<{ error: string | null }>()
);
