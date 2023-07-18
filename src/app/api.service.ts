import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project } from './person/person.model';
// eslint-disable-next-line sort-imports
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({providedIn:'root'})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  getPeople(): Observable<Project[]> {
    return this.http.get<Project[]>('https://hu-22-angular-mockapi-urtjok3rza-wl.a.run.app/project');
  }

}
