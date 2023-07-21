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

  usernamePattern: string = '^[a-zA-Z0-9!/. |-]{5,150}$';

  projectForm = new FormGroup({
    projectName: new FormControl('', [
      Validators.required,
      Validators.pattern(this.usernamePattern),
      Validators.maxLength(150)
    ]),
    projectOwner: new FormControl('', [Validators.required]),
    projectStartDate: new FormControl('', [Validators.required]),
    projectEndDate: new FormControl('', [Validators.required])
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
      data.projectEndDate = data.projectEndDate.toISOString();
      data.projectStartDate = data.projectStartDate.toISOString();
      // this.projectForm.reset();
      this.service.createProject(data).subscribe(
        (res: any) => {
          this.snackBar.open('res.message', 'Ok', {
            duration: 3000
          });
          this.router.navigate(['/']);
        },
        (err: any) => {
          if (err?.status === 400) {
            this.snackBar.open('projectID already exist', 'Undo', {
              duration: 3000
            });
          }
        }
      );
    }
  }
  reset() {
    this.projectForm.reset();
  }
}
