import { createAction, props } from '@ngrx/store';
import { project } from 'src/app/models/project.model';

export const createProject = createAction(
  '[Data] Add Project',
  props<{ content: project }>()
);
//Projects - source
//Add Project- event

export const loadProjects = createAction('[Data] Load Projects');

export const loadProjectsSuccess = createAction(
  '[Data] Fetch Data Success',
  props<{ data: any[] }>()
);

export const loadProjectsFailure = createAction(
  '[Data] Fetch Data Failure',
  props<{ error: any }>()
);
