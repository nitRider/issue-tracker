import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsightsComponent } from './insights/insights.component';
import { IssueDetailsComponent } from './issue-details/issue-details.component';
import { ProjectBoardComponent } from './project-board/project-board.component';

const routes: Routes = [
  { path: '', component: ProjectBoardComponent },
  { path: 'view-insights', component: InsightsComponent },
  { path: 'issue-details', component: IssueDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
