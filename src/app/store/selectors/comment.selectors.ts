import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CommentState } from '../state/data.state';

export const selectCommentState =
  createFeatureSelector<CommentState>('comment');

export const selectCommentData = createSelector(
  selectCommentState,
  (state: CommentState) => state.data
);
