import {Component, OnInit} from '@angular/core';
import {IStudent} from "../../interfaces/student";
import {ApiService} from "../../services/api.service";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {AsyncPipe, CommonModule} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {FormsModule} from "@angular/forms";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";

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

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatProgressSpinnerModule,
    AsyncPipe,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDividerModule,
    MatSnackBarModule,
  ]
})
export class SettingsComponent implements OnInit {
  studentsJson: string = '';
  isUseLocalStorage: boolean;

  constructor(
    private api: ApiService,
    private snackBar: MatSnackBar
  ) {
    this.isUseLocalStorage = api.isUseLocalStorage;
  }

  public ngOnInit(): void {
  }

  putFakeStudents() {
    this.studentsJson = JSON.stringify(mockStudents, null, 2);
  }

  uploadStudents() {
    try {
      const students = JSON.parse(this.studentsJson);
      localStorage.setItem('students', JSON.stringify(students));

      this.snackBar.open('Студенты успешно загружены!', 'Ок', {
        duration: 8000
      });
    } catch (error) {
      this.snackBar.open('Ошибка при загрузке студентов. Убедитесь, что JSON корректен.', 'Блин', {
        duration: 8000
      });
    }
  }

  public clearStudents(): void {
    localStorage.clear();
    this.snackBar.open('Студенты удалены', 'Опа', {
      duration: 8000
    });
  }

  toggleLocalStorage() {
    this.isUseLocalStorage = !this.isUseLocalStorage;
    this.api.isUseLocalStorage = this.isUseLocalStorage;
  }
}
