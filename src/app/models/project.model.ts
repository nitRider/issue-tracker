export interface projectRequest {
  projectName: string;
  projectOwner: number;
  projectStartDate: Date;
  projectEndDate: Date;
}
export interface issueRequest {
  summary: string;
  type: number;
  projectID: string;
  description: string;
  priority: number;
  status: number;
  assignee: number;
  tags: Array<string>;
  sprint: string;
  storyPoint: number;
}

export interface updateIssueRequest {
  summary?: string;
  type?: number;
  projectID?: string;
  description?: string;
  priority?: number;
  status?: number;
  assignee?: number;
  tags?: Array<string>;
  sprint?: string;
  storyPoint?: number;
}

export interface loginRequest {
  email: string;
  password: string;
}
export interface signUpRequest {
  id: string;
  name: string;
  email: string;
  teamName: string;
  desination: string;
  password: string;
}
export interface userRequest {
  desination: string;
  email: string;
  id: number;
  name: string;
  teamName: string;
}
export interface project {
  projectID: string;
  projectName: string;
  projectStartDate: Date;
  projectEndDate: Date;
  projectOwner: projectObj;
}
export interface projectObj {
  id: number;
  name: string;
  email: string;
  teamName: string;
  desination: string;
}
