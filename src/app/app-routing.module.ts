import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateIssuesComponent } from './modules/create-issues/create-issues.component';
import { CreateProjectComponent } from './modules/create-project/create-project.component';
import { InsightsComponent } from './modules/insights/insights.component';
import { IssueDetailsComponent } from './modules/issue-details/issue-details.component';
import { ProjectBoardComponent } from './modules/project-board/project-board.component';

const routes: Routes = [
  { path: '', component: ProjectBoardComponent },
  { path: 'create-issue', component: CreateIssuesComponent },
  { path: 'view-insights', component: InsightsComponent },
  { path: 'create-project', component: CreateProjectComponent },
  { path: 'issue-details', component: IssueDetailsComponent },
  { path: 'update-issue', component: CreateIssuesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
