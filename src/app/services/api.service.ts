import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  issueRequest,
  loginRequest,
  project,
  projectRequest,
  signUpRequest,
  updateIssueRequest,
  userRequest
} from '../models/project.model';
import { DataState } from '../store/state/data.state';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl: string = 'https://hu-22-angular-mockapi-urtjok3rza-wl.a.run.app/';

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    userid: '1'
  });
  constructor(
    private http: HttpClient,
    private store: Store<{ data: DataState }>
  ) {}
  /**
   * auth
   * @returns
   */

  logIn(loginBody: loginRequest) {
    return this.http.post(this.baseUrl + 'auth/login', loginBody);
  }

  signUp(signUpBody: signUpRequest) {
    return this.http.post(this.baseUrl + 'auth/signup', signUpBody);
  }

  /**
   * projects
   * @returns
   */

  getAllProject() {
    return this.http.get(this.baseUrl + 'project', {
      headers: this.headers
    });
  }

  // ngrx effect
  getProjectList(): Observable<project[]> {
    return this.http.get<project[]>(this.baseUrl + 'project', {
      headers: this.headers
    });
  }

  createProject(projectBody: projectRequest) {
    return this.http.post(this.baseUrl + 'project', projectBody, {
      headers: this.headers
    });
  }

  /**
   * users api
   * @returns
   */
  getAllUser() {
    return this.http.get(this.baseUrl + 'user');
  }

  //ngrx
  getUserList(): Observable<userRequest[]> {
    return this.http.get<userRequest[]>(this.baseUrl + 'user');
  }

  getUserByUserId(id: number) {
    return this.http.get(this.baseUrl + 'user', {
      params: { userID: id }
    });
  }
  getUsersByTeamName(teamName: any) {
    return this.http.get(this.baseUrl + 'user', {
      params: { teamName: teamName }
    });
  }

  /**
   * comments
   */

  getCommentList(projectID: string, issueID: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.baseUrl + 'comment', {
      params: { projectID: projectID, issueID: issueID },
      headers: this.headers
    });
  }

  getAllComments(projectID: string, issueID: string) {
    return this.http.get(this.baseUrl + 'comment', {
      params: { projectID: projectID, issueID: issueID },
      headers: this.headers
    });
  }
  createComment(projectID: string, issueID: string, body: string) {
    let params = {
      projectID: projectID,
      issueID: issueID
    };
    return this.http.post(this.baseUrl + 'comment', body, {
      params: params,
      headers: this.headers
    });
  }
  updateCommentwithCommentID(commentID: string, commentObj: Object) {
    return this.http.put(this.baseUrl + `comment/${commentID}`, commentObj, {
      headers: this.headers
    });
  }

  /**
   * issues
   */
  getAllIssues() {
    return this.http.get(this.baseUrl + 'issue', {
      headers: this.headers
    });
  }

  getIssuesForAGivenProject(projectID: string) {
    return this.http.get(this.baseUrl + 'issue', {
      params: { projectID: projectID },
      headers: this.headers
    });
  }

  getIssuesWithIssueID(issueID: string) {
    return this.http.get(this.baseUrl + `issue/${issueID}`, {
      headers: this.headers
    });
  }

  createIssue(issueBody: issueRequest) {
    return this.http.post(this.baseUrl + 'issue', issueBody, {
      headers: this.headers
    });
  }
  updateIssueWithIssueID(id: string, issueBody: updateIssueRequest) {
    return this.http.put(this.baseUrl + `issue/${id}`, issueBody, {
      headers: this.headers
    });
  }
}
