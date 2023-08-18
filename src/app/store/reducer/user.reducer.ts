import { createReducer, on } from '@ngrx/store';
import * as fromActions from '../action/user.action';
import { UserState } from '../state/data.state';

const initialUserState: UserState = {
  data: [],
  loading: false,
  error: null
};

export const userReducer = createReducer(
  initialUserState,
  on(fromActions.loadUser, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(fromActions.loadUserSuccess, (state, { data }) => ({
    ...state,
    data,
    loading: false,
    error: null
  })),
  on(fromActions.loadUserFailure, (state, { error }) => ({
    ...state,
    data: [],
    loading: false,
    error
  }))
);
