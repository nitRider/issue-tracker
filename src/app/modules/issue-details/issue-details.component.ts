import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ISSUESSTATUS } from 'src/app/common/utils/common.constant';
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
  constructor(
    private router: Router,
    private sharedService: SharedService,
    private datePipe: DatePipe
  ) {
    this.subscription = this.sharedService.data$.subscribe((data) => {
      this.data = data;
    });
  }

  ngOnInit(): void {
    this.isCommentFieldActive = false;
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
}
