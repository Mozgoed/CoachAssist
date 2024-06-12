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
  ]
})
export class StudentComponent implements OnInit {
  public student$: Observable<IStudent | undefined> = of(undefined);

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
}
