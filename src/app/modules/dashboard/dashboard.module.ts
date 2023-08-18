import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { CardComponent } from 'src/app/common/components/card/card.component';
import { LoaderComponent } from 'src/app/common/components/loader/loader.component';
import { MemberCardComponent } from 'src/app/common/components/member-card/member-card.component';
import { PageNotFoundComponent } from 'src/app/common/components/page-not-found/page-not-found.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { InsightsComponent } from './insights/insights.component';
import { IssueDetailsComponent } from './issue-details/issue-details.component';
import { ProjectBoardComponent } from './project-board/project-board.component';

@NgModule({
  declarations: [
    ProjectBoardComponent,
    CardComponent,
    InsightsComponent,
    MemberCardComponent,
    IssueDetailsComponent,
    LoaderComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    DragDropModule,
    RouterModule
  ]
})
export class DashboardModule {
  constructor() {}
}
