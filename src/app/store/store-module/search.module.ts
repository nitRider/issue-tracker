import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { searchReducer } from '../reducer/search.reducer';

@NgModule({
  imports: [StoreModule.forRoot({ data: searchReducer })]
})
export class SearchModule {}
