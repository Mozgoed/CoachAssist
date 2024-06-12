import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {StudentsModule} from "./pages/students/students.module";
import { StudentComponent } from './pages/student/student.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
    StudentsModule,
    StudentComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
