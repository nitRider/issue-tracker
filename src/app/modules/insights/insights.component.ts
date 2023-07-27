import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.scss']
})
export class InsightsComponent implements OnInit {
  private subscription: Subscription;
  data: any;

  constructor(private router: Router, private sharedService: SharedService) {
    this.subscription = this.sharedService.insightData$.subscribe((data) => {
      this.data = data;
      var temp = data?.member.filter((ele: any) => {
        return (
          JSON.stringify(ele) !== JSON.stringify(data?.owner?.projectOwner)
        );
      });
      this.data.member = temp !== undefined ? temp : [];
    });
  }

  ngOnInit(): void {}
  back() {
    this.router.navigate(['/']);
  }
}
