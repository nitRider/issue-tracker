import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ISSUESSTATUS } from 'src/app/common/utils/common.constant';
import {
  allIssueRequest,
  updateIssueRequest,
  userRequest
} from 'src/app/models/project.model';
import { ApiService } from 'src/app/services/api.service';
import { loadComment } from 'src/app/store/action/comment.action';
import { loadUser } from 'src/app/store/action/user.action';
import { selectCommentData } from 'src/app/store/selectors/comment.selectors';
import { selectUserData } from 'src/app/store/selectors/user.selectors';

@Component({
  selector: 'app-issue-details',
  templateUrl: './issue-details.component.html',
  styleUrls: ['./issue-details.component.scss']
})
export class IssueDetailsComponent implements OnInit {
  disableSelect = new FormControl(false);

  isCommentFieldActive: boolean = false;

  data: any;

  issueData!: allIssueRequest;

  updateOn?: Date;

  issueStatus = ISSUESSTATUS;

  commentList: any;

  isEdit: boolean = false;

  userList: userRequest[] = [];

  userData: any = [];

  projectID: string = '';

  id: string = '';

  isLoading: boolean = true;

  isDisabledComment: boolean = false;

  user$ = this.store.select(selectUserData);

  comment$ = this.store.select(selectCommentData);

  constructor(
    private router: Router,
    private datePipe: DatePipe,
    private service: ApiService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private store: Store
  ) {
    this.isEdit = false;
  }

  commentForm = new FormGroup({
    comment: new FormControl('', [Validators.required])
  });

  updateForm = new FormGroup({
    assignee: new FormControl(0),
    status: new FormControl(0)
  });

  ngOnInit(): void {
    this.store.dispatch(loadUser());

    this.isCommentFieldActive = false;
    this.route.queryParamMap.subscribe((params) => {
      this.projectID = params.get('projectID') as string;
      this.id = params.get('id') as string;
    });
    this.store.dispatch(
      loadComment({ projectID: this.projectID, issueID: this.id })
    );
    this.service.getIssuesWithIssueID(this.id).subscribe({
      next: (res: any) => {
        this.issueData = res;
        if (this.issueData !== undefined) {
          this.updateForm.patchValue({
            assignee: this.issueData.assignee.id,
            status: this.issueData.status
          });
        }
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

    this.service.getCommentList(this.projectID, this.id).subscribe({
      next: (res: any) => {
        this.commentList = res;
        this.isLoading = false;
      },
      error: (err) => {
        if (err.error.message != undefined)
          this.snackBar.open(err.error.message, 'Ok', {
            duration: 2000
          });
        this.isLoading = false;
      }
    });

    // this.service.getAllUser().subscribe({
    //   next: (res) => {
    //     this.userData = res;
    //     this.userData.forEach((ele: any) => {
    //       this.userList.push(ele);
    //     });
    //   }
    // });
  }

  back() {
    this.router.navigate(['/']);
  }
  EditIssue() {
    this.isEdit = true;
    this.router.navigate(['/update-issue'], {
      queryParams: { id: this.id }
    });
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
    this.isDisabledComment = true;
    if (this.commentForm.valid) {
      var data = this.commentForm.value;
      this.service
        .createComment(this.projectID, this.id, data as string)
        .subscribe({
          next: (res) => {
            this.commentForm.reset();
            this.isDisabledComment = false;
            this.ngOnInit();
          },
          error: (err) => {
            this.isDisabledComment = false;
            if (err.error.message !== undefined) {
              this.snackBar.open(err.error.message, 'Ok', {
                duration: 3000
              });
            }

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
        this.service.updateIssueWithIssueID(this.id, obj).subscribe({
          next: (res: any) => {
            this.snackBar.open(res.message, 'Ok', {
              duration: 3000
            });
          },
          error: (err) => {
            this.snackBar.open(err.error.message, 'Ok', {
              duration: 4000
            });
          }
        });
      }
    }
  }
}
// ng generate module dashboard --route existing --module app.module
