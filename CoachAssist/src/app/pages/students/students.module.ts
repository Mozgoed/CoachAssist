import {AsyncPipe, CommonModule} from '@angular/common';
import { NgModule } from '@angular/core';

import { StudentsComponent } from './students.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {StudentsRoutingModule} from "./students-routing.module";

@NgModule({
  declarations: [
    StudentsComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    AsyncPipe,
    StudentsRoutingModule
  ]
})
export class StudentsModule { }
