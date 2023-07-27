import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ISSUESSTATUS } from 'src/app/common/utils/common.constant';
import { updateIssueRequest, userRequest } from 'src/app/models/project.model';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-issue-details',
  templateUrl: './issue-details.component.html',
  styleUrls: ['./issue-details.component.scss']
})
export class IssueDetailsComponent implements OnInit {
  disableSelect = new FormControl(false);

  isCommentFieldActive: boolean = false;

  data!: any;

  updateOn?: Date;

  issueStatus = ISSUESSTATUS;

  private subscription: Subscription;

  commentList: any = [];

  isEdit: boolean = false;

  userList: userRequest[] = [];

  userData: any = [];

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private datePipe: DatePipe,
    private service: ApiService,
    private snackBar: MatSnackBar
  ) {
    this.subscription = this.sharedService.data$.subscribe((data) => {
      this.data = data;
      console.log(this.data);
    });
    this.isEdit = false;
  }

  commentForm = new FormGroup({
    comment: new FormControl('', [Validators.required])
  });

  updateForm = new FormGroup({
    assignee: new FormControl(''),
    status: new FormControl('')
  });

  ngOnInit(): void {
    this.isCommentFieldActive = false;
    this.service.getAllComments(this.data.projectID, this.data.id).subscribe({
      next: (res) => {
        this.commentList = res;
      },
      error: (err) => {
        this.snackBar.open(err.error.message, 'Ok', {
          duration: 3000
        });
      }
    });

    this.service.getAllUser().subscribe({
      next: (res) => {
        this.userData = res;
        this.userData.forEach((ele: any) => {
          this.userList.push(ele);
        });
        if (this.data !== undefined) {
          this.updateForm.patchValue({
            assignee: this.data.assignee.id,
            status: this.data.status
          });
        }
      }
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  back() {
    this.router.navigate(['/']);
  }
  EditIssue() {
    this.isEdit = true;
  }
  showComment() {
    this.isCommentFieldActive = true;
  }
  onCancel() {
    this.isCommentFieldActive = false;
  }
  formatDate(date: any): string {
    return this.datePipe.transform(date, 'dd-MM-yyyy') || '';
  }
  postComment() {
    if (this.commentForm.valid) {
      var data = this.commentForm.value;
      this.service
        .createComment(this.data.projectID, this.data.id, data)
        .subscribe({
          next: (res) => {
            this.commentForm.reset();
            this.ngOnInit();
          },
          error: (err) => {
            this.commentForm.reset();
          }
        });
    }
  }

  updateIssue(assignee: any, status: any) {
    if (assignee != '' || status != '') {
      var obj: updateIssueRequest = {};
      if (assignee != '') obj.assignee = assignee;
      if (status != '') obj.status = status;
      if (obj) {
        this.service.updateIssueWithIssueID(this.data.id, obj).subscribe({
          next: (res: any) => {
            this.snackBar.open(res.message, 'Ok', {
              duration: 3000
            });
          },
          error: (err) => {
            this.snackBar.open(err.error.message, 'Ok', {
              duration: 3000
            });
          }
        });
      }
    }
  }
}
