import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../state/data.state';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUserData = createSelector(
  selectUserState,
  (state: UserState) => state.data
);
