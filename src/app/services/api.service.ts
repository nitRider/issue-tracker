import { HttpClient } from '@angular/common/http';
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
    return this.http.get(this.baseUrl + 'project');
  }

  createProject(projectBody: projectRequest) {
    return this.http.post(this.baseUrl + 'project', projectBody);
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
  getUsersByTeamName(teamName: string) {
    return this.http.get(this.baseUrl + 'user', {
      params: { teamName: teamName }
    });
  }

  /**
   * comments
   */
  getAllComments(projectID: string, issueID: string) {
    return this.http.get(this.baseUrl + 'comment', {
      params: { projectID: projectID, issueID: issueID }
    });
  }
  createComment(projectID: string, issueID: string) {
    let body = {
      projectID: projectID,
      issueID: issueID
    };
    return this.http.post(this.baseUrl + 'comment', body);
  }
  updateCommentwithCommentID(commentID: string, commentObj: Object) {
    return this.http.put(this.baseUrl + `comment/${commentID}`, commentObj);
  }

  /**
   * issues
   */
  getAllIssues() {
    return this.http.get(this.baseUrl + 'issue');
  }

  getIssuesForAGivenProject(projectID: string) {
    return this.http.get(this.baseUrl + 'issue', {
      params: { projectID: projectID }
    });
  }

  getIssuesWithIssueID(issueID: string) {
    return this.http.get(this.baseUrl + 'issue', {
      params: { issueID: issueID }
    });
  }

  createIssue(issueBody: issueRequest) {
    return this.http.post(this.baseUrl + 'issue', issueBody);
  }
  updateIssueWithIssueID(issueBody: updateIssueRequest) {
    return this.http.put(this.baseUrl + 'issue', issueBody);
  }
}
