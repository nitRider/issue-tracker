import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { userRequest } from 'src/app/models/project.model';
import { ApiService } from 'src/app/services/api.service';
import { loadUser } from 'src/app/store/action/user.action';
import { selectUserData } from 'src/app/store/selectors/user.selectors';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {
  ownerList: userRequest[] = [];

  userData: any = [];

  usernamePattern: string = '^[a-zA-Z0-9!/.|-]{5,150}$';

  isLoading: boolean = false;

  user$ = this.store.select(selectUserData);

  projectForm = new FormGroup({
    projectName: new FormControl('', [
      Validators.required,
      Validators.pattern(this.usernamePattern)
    ]),
    projectOwner: new FormControl('', [Validators.required]),
    projectStartDate: new FormControl('', [Validators.required]),
    projectEndDate: new FormControl('', [Validators.required])
  });

  constructor(
    private service: ApiService,
    private router: Router,
    private snackBar: MatSnackBar,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadUser());

    // this.service.getAllUser().subscribe({
    //   next: (res) => {
    //     this.userData = res;
    //     this.userData.forEach((ele: any) => {
    //       this.ownerList.push(ele);
    //     });
    //   },
    //   error: (err) => {
    //     if (err.error.message != undefined)
    //       this.snackBar.open(err.error.message, 'Ok', {
    //         duration: 3000
    //       });
    //   }
    // });
  }
  onSubmit() {
    this.isLoading = true;

    if (this.projectForm.valid) {
      var data: any = this.projectForm.value;
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

      this.service.createProject(data as any).subscribe({
        next: (res: any) => {
          this.snackBar.open('Created new project successfully', 'Ok', {
            duration: 3000
          });
          this.isLoading = false;
          this.router.navigate(['/']);
        },
        error: (err: any) => {
          if (err.error.message != undefined) {
            this.snackBar.open(err.error.message, 'Ok', {
              duration: 3000
            });
          }
          if (err.error.detail != undefined) {
            this.snackBar.open(err.error.detail, 'Ok', {
              duration: 3000
            });
          }
          this.isLoading = false;
        }
      });
    }
  }
  reset() {
    this.projectForm.reset();
  }
}
