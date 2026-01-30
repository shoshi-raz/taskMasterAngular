import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksColumnBoardComponent } from './tasks-column-board.component';

describe('TasksColumnBoardComponent', () => {
  let component: TasksColumnBoardComponent;
  let fixture: ComponentFixture<TasksColumnBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksColumnBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksColumnBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
