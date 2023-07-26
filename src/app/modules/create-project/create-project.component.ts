import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { userRequest } from 'src/app/models/project.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {
  isSubmitting = false;

  ownerList: userRequest[] = [];

  userData: any = [];

  usernamePattern: string = '^[a-zA-Z0-9!/.|-]{5,150}$';

  projectForm = new FormGroup({
    projectName: new FormControl('', [
      Validators.required,
      Validators.pattern(this.usernamePattern),
      Validators.maxLength(150)
    ]),
    projectOwner: new FormControl('', [Validators.required]),
    projectStartDate: new FormControl(''),
    projectEndDate: new FormControl('')
  });

  constructor(
    private service: ApiService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.service.getAllUser().subscribe((res) => {
      this.userData = res;
      this.userData.forEach((ele: any) => {
        this.ownerList.push(ele);
      });
    });
  }
  onSubmit() {
    if (this.projectForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      var data = this.projectForm.value;
      if (
        typeof data.projectEndDate === 'object' &&
        data.projectEndDate !== null &&
        'toISOString' in data.projectEndDate
      ) {
        data.projectEndDate = data.projectEndDate.toISOString();
      }
      if (
        typeof data.projectStartDate === 'object' &&
        data.projectStartDate !== null &&
        'toISOString' in data.projectStartDate
      )
        data.projectStartDate = data.projectStartDate.toISOString();
      this.service.createProject(data).subscribe({
        next: (res: any) => {
          this.isSubmitting = false;
          this.snackBar.open('Created new project successfully', 'Ok', {
            duration: 3000
          });
          this.projectForm.reset();
          this.router.navigate(['/']);
        },
        error: (err: any) => {
          if (err?.status === 400) {
            this.snackBar.open('projectID already exist', 'Ok', {
              duration: 3000
            });
          }
          this.projectForm.reset();
        }
      });
    }
  }
  reset() {
    this.projectForm.reset();
  }
}
