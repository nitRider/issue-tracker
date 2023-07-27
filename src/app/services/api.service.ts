import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  issueRequest,
  loginRequest,
  projectRequest,
  signUpRequest,
  updateIssueRequest
} from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl: string = 'https://hu-22-angular-mockapi-urtjok3rza-wl.a.run.app/';

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    userid: '1'
  });
  constructor(private http: HttpClient) {}
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
