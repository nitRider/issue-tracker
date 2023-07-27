export interface projectRequest {
  projectName: string;
  projectOwner: number;
  projectStartDate: Date;
  projectEndDate: Date;
  projectID?: string;
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
export interface allIssueRequest {
  id?: string;
  summary: string;
  type: number;
  projectID?: string;
  description: string;
  priority: number;
  status: number;
  assignee: projectOwnerObj;
  tags: Array<string>;
  sprint: string;
  storyPoint: number;
  createdBy: projectOwnerObj;
  createdOn?: Date;
  updatedBy?: projectOwnerObj;
  updatedOn?: Date;
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
  projectOwner?: projectOwnerObj;
}
interface projectOwnerObj {
  id: number;
  name: string;
  email: string;
  teamName: string;
  desination: string;
}
export interface projectObj {
  id: number;
  name: string;
  email: string;
  teamName: string;
  desination: string;
}
export interface Type {
  name: string;
  id: number;
}
export interface Priority {
  name: string;
  id: number;
}
export interface Tags {
  name: string;
  id: number;
}
export interface Status {
  name: string;
  id: number;
}
