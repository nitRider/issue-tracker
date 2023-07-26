import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {
  ISSUESPRIORITY,
  ISSUESSTATUS,
  ISSUETAGS,
  ISSUETYPES,
  SPRINTS
} from 'src/app/common/utils/common.constant';
import { project, userRequest } from 'src/app/models/project.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-create-issues',
  templateUrl: './create-issues.component.html',
  styleUrls: ['./create-issues.component.scss']
})
export class CreateIssuesComponent implements OnInit {
  isSubmitting = false;

  issueTypes = ISSUETYPES;

  issuePriority = ISSUESPRIORITY;

  issueTags = ISSUETAGS;

  issueStatus = ISSUESSTATUS;

  sprints = SPRINTS;

  userList: userRequest[] = [];

  userData: any = [];

  projectData: any = [];

  projectList: project[] = [];

  summaryPattern: string = '^[a-zA-Z0-9!/.|-]{5,150}$';

  issueForm = new FormGroup({
    summary: new FormControl('', [
      Validators.required,
      Validators.pattern(this.summaryPattern)
    ]),
    type: new FormControl('', [Validators.required]),
    projectID: new FormControl(''),
    description: new FormControl('', [Validators.required]),
    priority: new FormControl('', [Validators.required]),
    status: new FormControl(1),
    assignee: new FormControl('', [Validators.required]),
    tags: new FormControl([]),
    sprint: new FormControl('', [Validators.required]),
    storyPoint: new FormControl('', [Validators.required])
  });
  constructor(
    private service: ApiService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.service.getAllUser().subscribe((res) => {
      this.userData = res;
      this.userData.forEach((ele: any) => {
        this.userList.push(ele);
      });
    });

    this.service.getAllProject().subscribe((res) => {
      this.projectData = res;
      this.projectData.forEach((ele: any) => {
        this.projectList.push(ele);
      });
    });
  }
  onSubmit() {
    if (this.issueForm.valid && !this.isSubmitting) {
      this.service.createIssue(this.issueForm.value).subscribe({
        next: (res) => {
          this.issueForm.reset();
          this.isSubmitting = false;
          this.snackBar.open('Created new issue successfully', 'Ok', {
            duration: 3000
          });
          this.router.navigate(['/']);
        },
        error: (err) => {
          if (err?.status === 400) {
            this.snackBar.open('issue already exist', 'Ok', {
              duration: 3000
            });
          }
          this.issueForm.reset();
        }
      });
    }
  }
  reset() {
    this.issueForm.reset();
  }
}
