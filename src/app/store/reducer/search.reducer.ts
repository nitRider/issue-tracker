import { createReducer, on } from '@ngrx/store';
import { setData } from '../action/search.action';
import { SearchState } from '../state/data.state';

const initialState: SearchState = {
  data: ''
};

export const searchReducer = createReducer(
  initialState,
  on(setData, (state, { data }) => ({ ...state, data }))
);
