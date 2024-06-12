import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs';
import { IStudent } from '../interfaces/student';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  public getAllStudents$() {
    return this.http.get<IStudent[]>('/assets/mocks/students.json').pipe(delay(1000));
  }

  // public getPlayerById$(id: number) {
  //   return this.getAllStudents$().pipe(
  //     map(players => players.find(player => player.id == id))
  //   );
  // }
  //
  // public getPlayersByName$(name: string) {
  //   return this.getAllStudents$().pipe(
  //     map(players => players.filter(player => player.name.toLowerCase().includes(name.toLowerCase())))
  //   );
  // }
}
