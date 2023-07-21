import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { userRequest } from 'src/app/models/project.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {
  ownerList: userRequest[] = [];

  userData: any = [];

  usernamePattern: string = '^[a-zA-Z0-9!/.|-]{5,150}$';

  projectForm = new FormGroup({
    projectName: new FormControl('', [
      Validators.required,
      Validators.pattern(this.usernamePattern)
    ]),
    projectOwner: new FormControl('', [Validators.required]),
    projectStartDate: new FormControl(''),
    projectEndDate: new FormControl('')
  });

  constructor(private service: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.service.getAllUser().subscribe((res) => {
      this.userData = res;
      this.userData.forEach((ele: any) => {
        this.ownerList.push(ele);
      });
    });
  }
  onSubmit() {
    var data = this.projectForm.value;
    data.projectEndDate = data.projectEndDate.toISOString();
    data.projectStartDate = data.projectStartDate.toISOString();
    this.service.createProject(data).subscribe((res) => {
      this.projectForm.reset();
      this.router.navigate(['/']);
    });
  }
  reset() {
    this.projectForm.reset();
  }
}
