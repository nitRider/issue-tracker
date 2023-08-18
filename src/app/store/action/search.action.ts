import { createAction, props } from '@ngrx/store';

export const setData = createAction(
  '[Data] Set Data',
  props<{ data: string }>()
);
