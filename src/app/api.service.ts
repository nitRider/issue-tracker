import { HttpClient } from '@angular/common/http';
// eslint-disable-next-line sort-imports
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}
}
