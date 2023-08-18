import { createAction, props } from '@ngrx/store';
import { userRequest } from 'src/app/models/project.model';

/**
 * user action
 */

export const loadUser = createAction('[data] Load User');
export const loadUserSuccess = createAction(
  '[data]  Fetch Data Success',
  props<{ data: userRequest[] }>()
);
export const loadUserFailure = createAction(
  '[data] Fetch Data Failure',
  props<{ error: string | null }>()
);
