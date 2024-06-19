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
  isUseLocalStorage = false;

  public setIsUseLocalStorage(isUseLocalStorage: boolean): void {
    this.isUseLocalStorage = isUseLocalStorage;
    localStorage.setItem('isUseLocalStorage', JSON.stringify(isUseLocalStorage));
  }

  constructor(
    private http: HttpClient,
  ) {
    const value = localStorage.getItem('isUseLocalStorage');
    if (value === null) {
      localStorage.setItem('isUseLocalStorage', JSON.stringify(false));
    } else {
      this.isUseLocalStorage = JSON.parse(value);
    }
  }

  public getAllStudents$() {
    if (this.isUseLocalStorage) {
      const value = localStorage.getItem('students');
      const studentsJson = value ? JSON.parse(value) : null;
      const students: IStudent[] = studentsJson ? studentsJson as IStudent[] : [];
      return of(students).pipe(delay(1000));
    } else {
      if (environment.production) {
        return of(mockStudents).pipe(delay(1000));
      } else {
        return this.http.get<IStudent[]>('/assets/mocks/students.json').pipe(delay(1000));
      }
    }
  }

  public getStudentById$(id: number) {
    return this.getAllStudents$().pipe(
      map(students => students.find(student => student.id == id))
    );
  }

  public setStudentById$(student: IStudent) {
    if (this.isUseLocalStorage) {
      const value = localStorage.getItem('students');
      const studentsJson = value ? JSON.parse(value) : null;
      const students: IStudent[] = studentsJson ? studentsJson as IStudent[] : [];
      const index = students.findIndex(s => s.id === student.id);
      if (index !== -1) {
        students[index] = student;
      } else {
        students.push(student);
      }

      localStorage.setItem('students', JSON.stringify(students));
    } else {
      if (environment.production) {
        console.log('Сохранение student', student);
      } else {
        console.log('Сохранение student', student);
      }
    }
  }
}
