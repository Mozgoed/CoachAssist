import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from "@angular/material/card";
import {Observable, of} from "rxjs";
import {IStudent} from "../interfaces/student";
import {ApiService} from "../services/api.service";
import {AsyncPipe, CommonModule, NgIf} from "@angular/common";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    AsyncPipe,
  ],
  standalone: true
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
