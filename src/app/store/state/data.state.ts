import { project, userRequest } from 'src/app/models/project.model';

export interface DataState {
  data: project[];
  loading: boolean;
  error: string | null;
}
export interface UserState {
  data: userRequest[];
  loading: boolean;
  error: string | null;
}
export interface CommentState {
  data: any[];
  loading: boolean;
  error: string | null;
}
export interface SearchState {
  data: string;
}
