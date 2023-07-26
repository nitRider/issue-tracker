import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  //view issues
  private dataSubject = new BehaviorSubject<any>(null);
  public data$ = this.dataSubject.asObservable();

  //view insights
  private insightDataSubject = new BehaviorSubject<any>(null);
  public insightData$ = this.insightDataSubject.asObservable();

  //search Data
  private searchDataSubject = new BehaviorSubject<any>(null);
  public searchData$ = this.searchDataSubject.asObservable();

  setData(data: any) {
    this.dataSubject.next(data);
  }

  setInsightData(data: any) {
    this.insightDataSubject.next(data);
  }

  setSearchData(data: any) {
    this.insightDataSubject.next(data);
  }

  constructor() {}
}
