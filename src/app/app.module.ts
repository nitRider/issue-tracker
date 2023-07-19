import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/components/header/header.component';
import { SidebarComponent } from './common/components/sidebar/sidebar.component';
import { CreateIssuesComponent } from './modules/create-issues/create-issues.component';
import { ProjectBoardComponent } from './modules/projectBoard/project-board/project-board.component';
import { PersonComponent } from './person/person.component';
import { CardComponent } from './common/components/card/card.component';
import { InsightsComponent } from './modules/insights/insights.component';
import { MemberCardComponent } from './common/components/member-card/member-card.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonComponent,
    SidebarComponent,
    HeaderComponent,
    ProjectBoardComponent,
    CreateIssuesComponent,
    CardComponent,
    InsightsComponent,
    MemberCardComponent
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
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
