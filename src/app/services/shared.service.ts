import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  //search Data
  private searchDataSubject = new BehaviorSubject<any>(null);
  public searchData$ = this.searchDataSubject.asObservable();

  setSearchData(data: any) {
    this.searchDataSubject.next(data);
  }

  constructor() {}
}
