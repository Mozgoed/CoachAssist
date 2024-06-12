import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {delay, Observable, of} from 'rxjs';
import { IStudent } from '../interfaces/student';
import {environment} from "../../environments/environment";

const mockStudents: IStudent[] = [
  {
    "id": 1,
    "name": "Иванов Иван",
    "grade": "5 класс",
    "info": "Надо потренировать 1 закон Ньютона"
  },
  {
    "id": 2,
    "name": "Петрова Мария",
    "grade": "6 класс",
    "info": "Улучшить знания по математике"
  },
  {
    "id": 3,
    "name": "Сидоров Алексей",
    "grade": "7 класс",
    "info": "Работа над произношением в английском языке"
  },
  {
    "id": 4,
    "name": "Кузнецова Анна",
    "grade": "5 класс",
    "info": "Улучшить навыки письма"
  },
  {
    "id": 5,
    "name": "Васильев Дмитрий",
    "grade": "6 класс",
    "info": "Подтянуть знания по истории"
  }
];

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  public getAllStudents$() {
    if (environment.production) {
      return of(mockStudents).pipe(delay(1000));
    } else {
      return this.http.get<IStudent[]>('/assets/mocks/students.json').pipe(delay(1000));
    }
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
