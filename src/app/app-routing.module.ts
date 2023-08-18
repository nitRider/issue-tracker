import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './common/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (mod) => mod.DashboardModule
      )
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/create-issues/create-issue.module').then(
        (mod) => mod.CreateIssueModule
      )
  },
  {
    path: 'create-project',
    loadChildren: () =>
      import('./modules/create-project/create-project.module').then(
        (mod) => mod.CreateProjectModule
      )
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
