import { Component, input, output } from '@angular/core';

import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { TaskItemComponent } from '../task-item/task-item.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Task, TaskPriority, TaskStatus } from '../../../models/task.model';

@Component({
  selector: 'app-tasks-column-board',
  imports: [
        CommonModule,
    DragDropModule,
    TaskItemComponent,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './tasks-column-board.component.html',
  styleUrl: './tasks-column-board.component.css',
})
export class TasksColumnBoardComponent {
  title = input.required<string>();
  status = input.required<TaskStatus>();
  tasks = input.required<Task[]>();

  dropped = output<CdkDragDrop<Task[]>>();
  addTaskClicked = output<TaskStatus>();
  priorityChanged = output<{id: number, priority: TaskPriority}>();
  taskDeleted = output<number>();
  openTaskComments = output<number>();

  onDrop(event: CdkDragDrop<Task[]>) {
    this.dropped.emit(event);
  }

}
