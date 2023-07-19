import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateIssuesComponent } from './modules/create-issues/create-issues.component';
import { InsightsComponent } from './modules/insights/insights.component';
import { ProjectBoardComponent } from './modules/projectBoard/project-board/project-board.component';

const routes: Routes = [
  { path: '', component: ProjectBoardComponent },
  { path: 'create-issue', component: CreateIssuesComponent },
  { path: 'view-insights', component: InsightsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
