import {Component, OnInit} from '@angular/core';
import {Observable, of} from "rxjs";
import {IStudent} from "../interfaces/student";
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {
  public students$: Observable<IStudent[]> = of([]);

  constructor(
    private api: ApiService
  ) { }

  public ngOnInit(): void {
    this.students$ = this.api.getAllStudents$();
  }
}
