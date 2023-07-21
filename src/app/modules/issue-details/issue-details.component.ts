import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-issue-details',
  templateUrl: './issue-details.component.html',
  styleUrls: ['./issue-details.component.scss']
})
export class IssueDetailsComponent implements OnInit {
  disableSelect = new FormControl(false);
  isCommentFieldActive: boolean = false;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.isCommentFieldActive = false;
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
}
