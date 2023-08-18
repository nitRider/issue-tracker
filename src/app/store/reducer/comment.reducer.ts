import { createReducer, on } from '@ngrx/store';
import * as fromProjectActions from '../action/comment.action';
import { CommentState } from '../state/data.state';

const initialState: CommentState = {
  data: [],
  loading: false,
  error: null
};

export const commentReducer = createReducer(
  initialState,
  on(fromProjectActions.loadComment, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(fromProjectActions.loadCommentSuccess, (state, { data }) => ({
    ...state,
    data,
    loading: false,
    error: null
  })),
  on(fromProjectActions.loadCommentFailure, (state, { error }) => ({
    ...state,
    data: [],
    loading: false,
    error
  }))
);
