import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CommentEffect } from '../effect/comment.effect';
import { commentReducer } from '../reducer/comment.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature('comment', commentReducer),
    EffectsModule.forFeature([CommentEffect])
  ],
  providers: []
})
export class CommentModule {}
