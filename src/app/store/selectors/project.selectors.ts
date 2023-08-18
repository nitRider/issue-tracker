import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DataState } from '../state/data.state';

export const selectProjectState = createFeatureSelector<DataState>('project');

export const selectProjectData = createSelector(
  selectProjectState,
  (state: DataState) => state.data
);
