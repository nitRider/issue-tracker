import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './common/components/card/card.component';
import { HeaderComponent } from './common/components/header/header.component';
import { MemberCardComponent } from './common/components/member-card/member-card.component';
import { SidebarComponent } from './common/components/sidebar/sidebar.component';
import { CreateIssuesComponent } from './modules/create-issues/create-issues.component';
import { CreateProjectComponent } from './modules/create-project/create-project.component';
import { InsightsComponent } from './modules/insights/insights.component';
import { IssueDetailsComponent } from './modules/issue-details/issue-details.component';
import { ProjectBoardComponent } from './modules/project-board/project-board.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    ProjectBoardComponent,
    CreateIssuesComponent,
    CardComponent,
    InsightsComponent,
    MemberCardComponent,
    CreateProjectComponent,
    IssueDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
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
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
