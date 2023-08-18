import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UserEffect } from '../effect/user.effect';
import { userReducer } from '../reducer/user.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature('user', userReducer),
    EffectsModule.forFeature([UserEffect])
  ],
  providers: []
})
export class UserModule {}
