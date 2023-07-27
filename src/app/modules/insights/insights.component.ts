import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import {
  issueRequest,
  project,
  userRequest
} from 'src/app/models/project.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.scss']
})
export class InsightsComponent implements OnInit {
  data: any;

  projectID: string = '';

  issueData!: issueRequest[];

  statusList: any = [];

  project!: project[];

  assignee!: userRequest[];

  isLoading: boolean = true;

  totalIssue: number = 0;

  totalMember: number = 0;

  constructor(
    private router: Router,
    private service: ApiService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.projectID = params.get('projectID') as string;
    });
    this.getProject();

    this.service.getIssuesForAGivenProject(this.projectID).subscribe({
      next: (res: any) => {
        this.issueData = res;
        this.totalIssue = this.issueData.length;
        this.getStatusList(this.issueData);
        if (res.length < 1) {
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        if (err.error.message != undefined)
          this.snackBar.open(err.error.message, 'Ok', {
            duration: 4000
          });
      }
    });
  }
  back() {
    this.router.navigate(['/']);
  }

  getStatusList(data: issueRequest[]) {
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
    this.statusList = status1;
  }
  getProject() {
    this.service.getAllProject().subscribe({
      next: (res: any) => {
        var temp = res;
        this.project = res;
        this.project = temp.filter((pro: any) => {
          return pro.projectID === this.projectID;
        });
        this.getMemberList(this.project);
        this.isLoading = false;
      },
      error: (err) => {
        if (err.error.message != undefined)
          this.snackBar.open(err.error.message, 'Ok', {
            duration: 4000
          });
        this.isLoading = false;
      }
    });
  }

  getMemberList(data: project[]) {
    if (data[0] != undefined) {
      this.service
        .getUsersByTeamName(data[0].projectOwner?.teamName)
        .subscribe({
          next: (res: any) => {
            this.totalMember = res.length;
            var temp = res.filter((ele: any) => {
              return (
                JSON.stringify(ele) !== JSON.stringify(data[0].projectOwner)
              );
            });
            this.assignee = temp;
          },
          error: (err) => {
            if (err.error.message != undefined)
              this.snackBar.open(err.error.message, 'Ok', {
                duration: 4000
              });
          }
        });
    }
  }
}
