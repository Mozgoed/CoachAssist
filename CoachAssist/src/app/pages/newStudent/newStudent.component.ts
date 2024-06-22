import { Component, OnInit } from '@angular/core';
import { Observable, of } from "rxjs";
import {IStudent} from "../../interfaces/student";
import {ApiService} from "../../services/api.service";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {AsyncPipe, CommonModule} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";

@Component({
  selector: 'app-newStudent',
  templateUrl: './newStudent.component.html',
  styleUrls: ['./newStudent.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    AsyncPipe,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
  ]
})
export class NewStudentComponent implements OnInit {
  student$: Observable<IStudent | undefined> = of(undefined);
  studentForm: FormGroup = new FormGroup({});

  constructor(
    private api: ApiService,
    private snackBar: MatSnackBar
  ) {
  }

  public ngOnInit(): void {
    this.student$.subscribe(() => {
      this.studentForm = new FormGroup({
        name: new FormControl(''),
        date: new FormControl(''),
        phone: new FormControl(''),
        subject: new FormControl(''),
        grade: new FormControl(''),
        father: new FormControl(''),
        fatherPhone: new FormControl(''),
        mother: new FormControl(''),
        motherPhone: new FormControl(''),
        info: new FormControl(''),
      });
    });
  }

  postStudent() {
    const newStudent: IStudent = this.studentForm.getRawValue();

    this.api.postNewStudent(newStudent);
    this.snackBar.open('Ученик добавлен', 'Ok', {
      duration: 8000
    });
  }
}
