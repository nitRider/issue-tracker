import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss']
})
export class MemberCardComponent implements OnInit {
  @Input() data: any;
  @Input() projectOwner: any;

  constructor() {}

  ngOnInit(): void {}
}
