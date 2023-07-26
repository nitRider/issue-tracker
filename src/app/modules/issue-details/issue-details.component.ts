import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ISSUESSTATUS } from 'src/app/common/utils/common.constant';
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

  data: any;

  updateOn?: Date;

  issueStatus = ISSUESSTATUS;

  private subscription: Subscription;

  commentList: any = [];

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private datePipe: DatePipe,
    private service: ApiService
  ) {
    this.subscription = this.sharedService.data$.subscribe((data) => {
      this.data = data;
    });
  }

  commentForm = new FormGroup({
    comment: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    this.isCommentFieldActive = false;
    this.service.getAllComments(this.data.projectID, this.data.id).subscribe({
      next: (res) => {
        this.commentList = res;
      },
      error: (err) => {
        console.log(err);
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
    this.router.navigate(['/update-issue']);
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
}
