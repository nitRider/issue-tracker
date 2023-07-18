import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Project } from './person.model';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  project!: Project[];
  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
    this.refreshPeople()
  }
  refreshPeople() {
    this.apiService.getPeople()
      .subscribe(data => {
        console.log(data)
       this.project=data;
      })

  }


}


