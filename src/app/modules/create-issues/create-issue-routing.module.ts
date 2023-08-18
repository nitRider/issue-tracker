import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateIssuesComponent } from './create-issues.component';

const routes: Routes = [
  { path: 'create-issues', component: CreateIssuesComponent },
  { path: 'update-issue', component: CreateIssuesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateIssueRoutingModule {}
