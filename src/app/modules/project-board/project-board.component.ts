import { moveItemInArray } from '@angular/cdk/drag-drop';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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

  constructor(
    private router: Router,
    private service: ApiService,
    private datePipe: DatePipe,
    private sharedService: SharedService
  ) {
    this.subscription = this.sharedService.data$.subscribe((data) => {
      this.filterData = this.issueList;
      this.searchText = data;
      if (typeof this.searchText === 'string') {
        var temp = [];
        temp = this.filterData.filter((item) => {
          return item.assignee.name
            .toLowerCase()
            .includes(this.searchText.toLowerCase());
        });
        this.filterData = temp;
      }
    });
  }

  viewInsights() {
    this.router.navigate(['/view-insights']);
  }
  issueDetails() {
    this.router.navigate(['/issue-details']);
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.getAsyncProjectData().subscribe((res: any) => {
      this.projectData = res;
      this.projectData.forEach((ele: any) => {
        this.projectLists.push(ele);
      });
      this.project = this.projectLists[0];
      this.getIssueOfGivenProject(this.projectLists[0]?.projectID);
      this.getProjectFromApi(this.projectLists[0]);

      this.isLoading = false;
    });
    this.getAllIssuesFromApi();
  }

  getProject(project: project) {
    this.project = project;
    this.getIssueOfGivenProject(project.projectID);
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

  sendDataToViewInsights(data: any) {
    var temp = data;
    var todo: any[] = [];
    var development: any[] = [];
    var testing: any[] = [];
    var completed: any[] = [];
    var status1: any;
    temp = temp.filter((item: any) => {
      if (item?.status === 1) {
        todo.push(1);
      } else if (item?.status === 2) {
        development.push(1);
      } else if (item?.status === 3) {
        testing.push(1);
      } else if (item?.status === 4) {
        completed.push(1);
      }
    });
    status1 = {
      todo: todo,
      development: development,
      testing: testing,
      completed: completed,
      total: data?.length
    };

    data = { member: this.assignees, owner: this.project, status: status1 };
    this.sharedService.setInsightData(data);
    this.router.navigate(['/view-insights']);
  }
  getIssueOfGivenProject(projectID: any) {
    this.service.getIssuesForAGivenProject(projectID).subscribe((res: any) => {
      this.issueListOfGivenProject = res;
    });
  }
  getAsyncProjectData(): Observable<any> {
    return this.service.getAllProject();
  }
  onAssigneeSelectionChange(event: any) {
    var filterList: any[] = [];
    if (this.filterPriority.length) {
      filterList = this.filterPriority.filter((user) => {
        return user.assignee.name === event.value;
      });
    } else {
      filterList = this.issueList.filter((user) => {
        return user.assignee.name === event.value;
      });
    }
    this.filterAssignee = filterList;
    this.filterData = [...this.filterAssignee];
  }
  onPrioritySelectionChange(event: any) {
    var priorityFilter: any[] = [];
    if (this.filterAssignee.length) {
      var d: any[] = [];
      console.log(event.value);
      event.value.forEach((ele: any) => {
        var temp = this.filterAssignee.filter((user) => {
          return user.priority === ele;
        });
        d = [...temp, ...d];
      });
      priorityFilter = d;
    } else {
      event.value.forEach((ele: any) => {
        var temp = this.issueList.filter((user) => {
          return user.priority === ele;
        });
        priorityFilter = [...temp, ...priorityFilter];
      });
    }

    this.filterPriority = priorityFilter;
    this.filterData = [...this.filterPriority];
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
    console.log(event.previousContainer);
    console.log(event.container);
    console.log(event);

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
}
