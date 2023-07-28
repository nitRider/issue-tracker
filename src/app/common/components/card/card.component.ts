import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { allIssueRequest } from 'src/app/models/project.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() data?: allIssueRequest;

  constructor(private datePipe: DatePipe) {}

  ngOnInit(): void {}
  formatDate(date: any): string {
    return this.datePipe.transform(date, 'dd-MM-yyyy') || '';
  }
}
