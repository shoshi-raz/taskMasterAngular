import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCommentsDialogComponent } from './task-comments-dialog.component';

describe('TaskCommentsDialogComponent', () => {
  let component: TaskCommentsDialogComponent;
  let fixture: ComponentFixture<TaskCommentsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCommentsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskCommentsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
