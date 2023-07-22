import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { project, userRequest } from 'src/app/models/project.model';
import { ApiService } from 'src/app/services/api.service';

interface Type {
  name: string;
  id: number;
}
interface Priority {
  name: string;
  id: number;
}
interface Tags {
  name: string;
  id: number;
}
interface Status {
  name: string;
  id: number;
}

@Component({
  selector: 'app-create-issues',
  templateUrl: './create-issues.component.html',
  styleUrls: ['./create-issues.component.scss']
})
export class CreateIssuesComponent implements OnInit {
  isSubmitting = false;

  issueTypes: Type[] = [
    { name: 'BUG', id: 1 },
    { name: 'TASK', id: 2 },
    { name: 'STORY', id: 3 }
  ];

  issuePriority: Priority[] = [
    { name: 'LOW', id: 1 },
    { name: 'MEDIUM', id: 2 },
    { name: 'HIGH', id: 3 }
  ];

  issueTags: Tags[] = [
    { name: 'HU-22', id: 1 },
    { name: 'Angular track', id: 2 },
    { name: 'Java track', id: 3 },
    { name: 'Python track', id: 4 }
  ];

  issueStatus: Status[] = [
    { name: 'To-Do', id: 1 },
    { name: 'Development', id: 2 },
    { name: 'Testing', id: 3 },
    { name: 'Completed', id: 4 }
  ];

  sprints: string[] = [
    'Sprint 21',
    'Sprint 22',
    'Sprint 23',
    'Sprint 24',
    'Sprint 25'
  ];

  userList: userRequest[] = [];

  userData: any = [];

  projectData: any = [];

  projectList: project[] = [];

  summaryPattern: string = '^[a-zA-Z0-9!/. |-]{5,150}$';

  issueForm = new FormGroup({
    summary: new FormControl('', [
      Validators.required,
      Validators.pattern(this.summaryPattern)
    ]),
    type: new FormControl('', [Validators.required]),
    projectID: new FormControl(''),
    description: new FormControl('', [Validators.required]),
    priority: new FormControl('', [Validators.required]),
    status: new FormControl(1),
    assignee: new FormControl('', [Validators.required]),
    tags: new FormControl([]),
    sprint: new FormControl('', [Validators.required]),
    storyPoint: new FormControl('', [Validators.required])
  });
  constructor(private service: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.service.getAllUser().subscribe((res) => {
      this.userData = res;
      this.userData.forEach((ele: any) => {
        this.userList.push(ele);
      });
    });

    this.service.getAllProject().subscribe((res) => {
      this.projectData = res;
      this.projectData.forEach((ele: any) => {
        this.projectList.push(ele);
      });
    });
  }
  onSubmit() {
    if (this.issueForm.valid && !this.isSubmitting) {
      this.service.createIssue(this.issueForm.value).subscribe((res) => {
        console.log(res);
        this.issueForm.reset();
        this.router.navigate(['/']);
      });
    }
  }
  reset() {
    this.issueForm.reset();
  }
}
