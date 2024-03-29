import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  ISSUESPRIORITY,
  ISSUESSTATUS,
  ISSUETAGS,
  ISSUETYPES,
  SPRINTS
} from 'src/app/common/utils/common.constant';
import {
  allIssueRequest,
  issueRequest,
  project,
  updateIssueRequest,
  userRequest
} from 'src/app/models/project.model';
import { ApiService } from 'src/app/services/api.service';
import { loadProjects } from 'src/app/store/action/project.action';
import { loadUser } from 'src/app/store/action/user.action';
import { selectProjectData } from 'src/app/store/selectors/project.selectors';
import { selectUserData } from 'src/app/store/selectors/user.selectors';

@Component({
  selector: 'app-create-issues',
  templateUrl: './create-issues.component.html',
  styleUrls: ['./create-issues.component.scss']
})
export class CreateIssuesComponent implements OnInit {
  // @Input() data: any;

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

  issueID: string = '';

  issueData!: allIssueRequest;

  isLoading: boolean = false;

  project$ = this.store.select(selectProjectData);

  user$ = this.store.select(selectUserData);

  issueForm = new FormGroup({
    summary: new FormControl('', [
      Validators.required,
      Validators.pattern(this.summaryPattern)
    ]),
    type: new FormControl(0, [Validators.required]),
    projectID: new FormControl('', [Validators.required]),
    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(500)
    ]),
    priority: new FormControl(0, [Validators.required]),
    status: new FormControl(1, [Validators.required]),
    assignee: new FormControl(0, [Validators.required]),
    tags: new FormControl([''], [Validators.required]),
    sprint: new FormControl('', [Validators.required]),
    storyPoint: new FormControl(0, [Validators.required])
  });
  constructor(
    private service: ApiService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadProjects());

    this.store.dispatch(loadUser());

    // this.service.getUserList().subscribe({
    //   next: (res) => {
    //     this.userData = res;
    //     this.userData.forEach((ele: any) => {
    //       this.userList.push(ele);
    //     });
    //   },
    //   error: (err) => {
    //     if (err.error.message != undefined) {
    //       this.snackBar.open(err.error.message, 'Ok', {
    //         duration: 3000
    //       });
    //     }
    //   }
    // });

    // this.project$.subscribe({
    //   next: (res) => {
    //     this.projectData = res;
    //     this.projectData.forEach((ele: any) => {
    //       this.projectList.push(ele);
    //     });
    //   },
    //   error: (err) => {
    //     if (err.error.message != undefined) {
    //       this.snackBar.open(err.error.message, 'Ok', {
    //         duration: 3000
    //       });
    //     }
    //   }
    // });

    this.route.queryParamMap.subscribe((params) => {
      this.issueID = params.get('id') as string;
    });
    if (this.issueID != '' || this.issueID != null) {
      this.service.getIssuesWithIssueID(this.issueID).subscribe({
        next: (res: any) => {
          this.issueData = res;
          if (this.issueData != undefined) {
            this.issueForm.patchValue({
              summary: this.issueData.summary,
              type: this.issueData.type,
              projectID: this.issueData.projectID,
              description: this.issueData.description,
              priority: this.issueData.priority,
              assignee: this.issueData.assignee.id,
              tags: this.issueData.tags,
              sprint: this.issueData.sprint,
              storyPoint: this.issueData.storyPoint
            });
          }
        },
        error: (err) => {
          if (err.error.message != undefined) {
            this.snackBar.open(err.error.message, 'Ok', {
              duration: 3000
            });
          }
        }
      });
    }
  }
  onSubmit() {
    this.isLoading = true;
    if (this.issueForm.valid) {
      this.service.createIssue(this.issueForm.value as issueRequest).subscribe({
        next: (res) => {
          this.snackBar.open('Created new issue successfully', 'Ok', {
            duration: 3000
          });
          this.isLoading = false;
          this.issueForm.reset();
          this.router.navigate(['/']);
        },
        error: (err) => {
          if (err.error.message != undefined) {
            this.snackBar.open(err.error.message, 'Ok', {
              duration: 3000
            });
          }
          this.isLoading = false;
          this.issueForm.reset();
        }
      });
    }
  }
  reset() {
    this.issueForm.reset();
  }
  getPasteData(data: any) {
    const input = data.target as HTMLInputElement;
    const maxLength = parseInt(input.getAttribute('maxlength') || '0', 500);
    if (input.value.length > maxLength) {
      input.value = input.value.slice(0, maxLength);
      this.issueForm.get('description')!.setValue(input.value);
    }
  }
  onUpdate() {
    if (this.issueForm.valid) {
      this.isLoading = true;
      var updateData = this.issueForm.value;
      delete updateData.projectID;
      this.service
        .updateIssueWithIssueID(this.issueID, updateData as updateIssueRequest)
        .subscribe({
          next: (res) => {
            this.snackBar.open('Updated issue successfully', 'Ok', {
              duration: 3000
            });
            this.isLoading = false;
            this.router.navigate(['/']);
          },
          error: (err) => {
            if (err.error.message != undefined)
              this.snackBar.open(err.error.message, 'Ok', {
                duration: 3000
              });
            this.isLoading = false;
          }
        });
    }
  }
}
