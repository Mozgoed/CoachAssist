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
  ]
})
export class StudentComponent implements OnInit {
  student$: Observable<IStudent | undefined> = of(undefined);
  isDisabled = true;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    this.student$ = this.route.paramMap.pipe(
      map(params => params.get('id') ?? ''),
      switchMap(id => this.api.getStudentById$(Number(id)))
    );
  }

  toggleDisabled() {
    this.isDisabled = !this.isDisabled;
  }

  callPhone(phone: string | undefined) {
    if (this.isDisabled && phone) window.location.href = `tel:${phone}`;
  }
}
