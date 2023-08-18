import { createReducer, on } from '@ngrx/store';
import * as fromProjectActions from '../action/project.action';
import { DataState } from '../state/data.state';

const initialState: DataState = {
  data: [],
  loading: false,
  error: null
};

export const projectReducer = createReducer(
  initialState,
  on(fromProjectActions.loadProjects, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(fromProjectActions.loadProjectsSuccess, (state, { data }) => ({
    ...state,
    data,
    loading: false,
    error: null
  })),
  on(fromProjectActions.loadProjectsFailure, (state, { error }) => ({
    ...state,
    data: [],
    loading: false,
    error
  }))
);
