import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ProjectEffect } from '../effect/project.effect';
import { projectReducer } from '../reducer/project.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature('project', projectReducer),
    EffectsModule.forFeature([ProjectEffect])
  ],
  providers: []
})
export class ProjectModule {}
