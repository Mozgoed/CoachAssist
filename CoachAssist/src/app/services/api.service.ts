import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {delay, map, of} from 'rxjs';
import { IStudent } from '../interfaces/student';
import {environment} from "../../environments/environment";

const mockStudents: IStudent[] = [
  {
    "id": 1,
    "name": "Иванов Иван",
    "date": "01.03.2007",
    "phone": "+79031234567",
    "subject": "Физика",
    "grade": "5 класс",
    "mother": "Иванова Мария Владимировна",
    "motherPhone": "+79031234567",
    "info": "Надо потренировать 1 закон Ньютона"
  },
  {
    "id": 2,
    "name": "Петрова Мария",
    "date": "01.03.2007",
    "phone": "+79031234567",
    "subject": "Физика",
    "grade": "6 класс",
    "mother": "Иванова Мария Владимировна",
    "motherPhone": "+79031234567",
    "info": "Улучшить знания по математике"
  },
  {
    "id": 3,
    "name": "Сидоров Алексей",
    "date": "01.03.2007",
    "phone": "+79031234567",
    "subject": "Физика",
    "grade": "5 класс",
    "mother": "Иванова Мария Владимировна",
    "motherPhone": "+79031234567",
    "info": "Работа над произношением в английском языке"
  },
  {
    "id": 4,
    "name": "Кузнецова Анна",
    "date": "01.03.2007",
    "phone": "+79031234567",
    "subject": "Физика",
    "grade": "5 класс",
    "mother": "Иванова Мария Владимировна",
    "motherPhone": "+79031234567",
    "info": "Улучшить навыки письма"
  },
  {
    "id": 5,
    "name": "Васильев Дмитрий",
    "date": "01.03.2007",
    "phone": "+79031234567",
    "subject": "Физика",
    "grade": "5 класс",
    "mother": "Иванова Мария Владимировна",
    "motherPhone": "+79031234567",
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

  public getStudentById$(id: number) {
    return this.getAllStudents$().pipe(
      map(students => students.find(student => student.id == id))
    );
  }

  // public getPlayersByName$(name: string) {
  //   return this.getAllStudents$().pipe(
  //     map(players => players.filter(player => player.name.toLowerCase().includes(name.toLowerCase())))
  //   );
  // }
}
