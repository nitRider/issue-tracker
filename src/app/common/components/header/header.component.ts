import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SharedService } from 'src/app/services/shared.service';
import { setData } from 'src/app/store/action/search.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentRoute: string;

  searchText: string;

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private store: Store
  ) {
    this.currentRoute = '';
    this.searchText = '';
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }
  ngOnInit(): void {}
  search(event: any) {
    this.store.dispatch(setData({ data: event.target.value.trim() }));

    this.sharedService.setSearchData(event.target.value.trim());
  }
}
