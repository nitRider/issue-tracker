import { moveItemInArray } from '@angular/cdk/drag-drop';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ISSUESPRIORITY } from 'src/app/common/utils/common.constant';
import {
  allIssueRequest,
  project,
  userRequest
} from 'src/app/models/project.model';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-project-board',
  templateUrl: './project-board.component.html',
  styleUrls: ['./project-board.component.scss']
})
export class ProjectBoardComponent implements OnInit {
  projectData: any = [];

  projectLists: project[] = [];

  project!: project;

  issuePriority = ISSUESPRIORITY;

  isLoading: boolean = true;

  assignees!: userRequest[];

  issueList: allIssueRequest[] = [];

  issueListOfGivenProject: any = [];

  projectID: string = '';

  filterAssignee: any[] = [];

  filterPriority: any[] = [];

  filterData: any[] = [];

  private subscription: Subscription;

  searchText: string = '';

  activeIssueDetail: boolean = false;

  activeViewInsights: boolean = false;

  issueData!: allIssueRequest;

  selectedAssigness: string = '';

  selectedPriority: number[] = [];

  projectForm = new FormGroup({
    projectName: new FormControl(''),
    projectOwner: new FormControl({ value: '', disabled: true })
  });

  constructor(
    private router: Router,
    private service: ApiService,
    private datePipe: DatePipe,
    private sharedService: SharedService
  ) {
    this.subscription = this.sharedService.data$.subscribe((data) => {
      this.filterData = this.issueList;
      this.searchText = data;
      const regexPattern = new RegExp(this.searchText, 'i');
      console.log(regexPattern);

      if (typeof this.searchText === 'string') {
        var temp = [];
        temp = this.filterData.filter((item) => {
          return (
            regexPattern.test(item.summary) ||
            regexPattern.test(item.description)
          );
        });
        this.filterData = temp;
      }
    });
  }

  viewInsights() {
    this.router.navigate(['/view-insights'], {
      queryParams: { projectID: this.project.projectID }
    });
  }
  issueDetails(issueData: allIssueRequest) {
    this.activeIssueDetail = true;
    this.issueData = issueData;
    this.router.navigate(['/issue-details'], {
      queryParams: { projectID: issueData.projectID, id: issueData.id }
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.getAsyncProjectData().subscribe((res: any) => {
      this.projectData = res;
      this.projectData.forEach((ele: any) => {
        this.projectLists.push(ele);
      });
      this.project = this.projectLists[0];

      this.projectForm.patchValue({
        projectName: this.projectLists[0].projectID,
        projectOwner: this.projectLists[0].projectOwner?.name
      });

      this.getProjectFromApi(this.projectLists[0]);

      this.isLoading = false;
    });
    this.getAllIssuesFromApi();
  }

  getProject(project: project) {
    this.project = project;
  }
  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'dd-MM-yyyy') || '';
  }

  getProjectFromApi(pro: project) {
    this.service
      .getUsersByTeamName(pro?.projectOwner?.teamName)
      .subscribe((res: any) => {
        this.assignees = res;
      });
  }

  getAllIssuesFromApi() {
    this.service.getAllIssues().subscribe((res: any) => {
      this.issueList = res;
      this.filterData = this.issueList;
      this.sortIssueData(this.issueList);
    });
  }

  getAsyncProjectData(): Observable<any> {
    return this.service.getAllProject();
  }

  sortIssueData(data: any) {
    if (data?.length > 0) {
      data.sort(
        (a: any, b: any) =>
          new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime()
      );
    }
  }
  onDrop(event: any, status: number) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const task: any = event.item.data;
      task.status = event.container.id;
      this.filterData.splice(event.currentIndex, 0, task);
      event.previousContainer.data.splice(event.previousIndex, 1);
    }
  }
  onFilter() {
    var temp = [];
    temp = this.issueList.filter((task) => {
      return (
        (this.selectedAssigness.includes(task.assignee.name) ||
          this.selectedAssigness === '') &&
        (this.selectedPriority.length === 0 ||
          this.selectedPriority.includes(task.priority))
      );
    });
    this.filterData = temp;
  }
}
