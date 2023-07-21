import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-project-board',
  templateUrl: './project-board.component.html',
  styleUrls: ['./project-board.component.scss']
})
export class ProjectBoardComponent implements OnInit {
  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' }
  ];
  toppings = new FormControl('');

  toppingList: string[] = [
    'Extra cheese',
    'Mushroom',
    'Onion',
    'Pepperoni',
    'Sausage',
    'Tomato'
  ];
  constructor(private router: Router, private service: ApiService) {}
  viewInsights() {
    this.router.navigate(['/view-insights']);
  }
  issueDetails() {
    this.router.navigate(['/issue-details']);
  }

  ngOnInit(): void {
    this.service.getUserByUserId(1).subscribe((res) => {
      console.log(res);
    });
  }
}
