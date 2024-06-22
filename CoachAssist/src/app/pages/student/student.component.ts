import {Component, OnInit} from '@angular/core';
import {map, Observable, of, switchMap} from "rxjs";
import {IStudent} from "../../interfaces/student";
import {ApiService} from "../../services/api.service";
import {ActivatedRoute} from "@angular/router";
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
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
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
export class StudentComponent implements OnInit {
  student$: Observable<IStudent | undefined> = of(undefined);
  studentForm: FormGroup = new FormGroup({});
  isDisabled = true;
  id?: number = 0;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
  }

  public ngOnInit(): void {
    this.student$ = this.route.paramMap.pipe(
      map(params => params.get('id') ?? ''),
      switchMap(id => this.api.getStudentById$(Number(id)))
    );

    this.student$.subscribe(student => {
      this.id = student?.id;

      this.studentForm = new FormGroup({
        name: new FormControl(student?.name),
        date: new FormControl(student?.date),
        phone: new FormControl(student?.phone),
        subject: new FormControl(student?.subject),
        grade: new FormControl(student?.grade),
        father: new FormControl(student?.father),
        fatherPhone: new FormControl(student?.fatherPhone),
        mother: new FormControl(student?.mother),
        motherPhone: new FormControl(student?.motherPhone),
        info: new FormControl(student?.info),
      });
    });
  }

  toggleDisabled() {
    this.isDisabled = !this.isDisabled;
  }

  callPhone(phone: string | undefined) {
    if (this.isDisabled && phone) window.location.href = `tel:${phone}`;
  }

  saveStudent() {
    const updatedStudent: IStudent = {
      id: this.id,
      ...this.studentForm.getRawValue(),
    };

    this.api.setStudentById$(updatedStudent);
    this.snackBar.open('Ученик обновлён', 'Ok', {
      duration: 8000
    });
  }
}
