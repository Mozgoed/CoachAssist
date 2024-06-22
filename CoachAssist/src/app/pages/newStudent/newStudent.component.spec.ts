import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStudentComponent } from './newStudent.component';

describe('StudentComponent', () => {
  let component: NewStudentComponent;
  let fixture: ComponentFixture<NewStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewStudentComponent]
    });
    fixture = TestBed.createComponent(NewStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
