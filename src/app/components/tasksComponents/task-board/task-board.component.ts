import { Component, computed, effect, inject, input } from '@angular/core';
import { TasksService } from '../../../services/tasks.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddTaskDialogComponent } from '../add-task-dialog/add-task-dialog.component';
import { Task, TaskPriority, TaskStatus } from '../../../models/task.model';
import { toSignal } from '@angular/core/rxjs-interop';

import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { TasksColumnBoardComponent } from '../tasks-column-board/tasks-column-board.component';
import { TaskCommentsDialogComponent } from '../task-comments-dialog/task-comments-dialog.component';
import { Breadcrumb } from '../../../models/navigation.model';
import { map } from 'rxjs/internal/operators/map';
import { ActivatedRoute } from '@angular/router';
import { PageNavigateComponent } from '../../page-navigate/page-navigate.component';

@Component({
  selector: 'app-task-board',
  imports: [
    CommonModule,
    DragDropModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatDialogModule,
    TasksColumnBoardComponent,
    PageNavigateComponent
  ],
  templateUrl: './task-board.component.html',
  styleUrl: './task-board.component.css',
})
export class TaskBoardComponent {
  projectId = input.required<number | null>();

  protected taskService = inject(TasksService);
  private dialog = inject(MatDialog);
  private route = inject(ActivatedRoute);

  readonly TaskStatus = TaskStatus;

  private filteredTasks = computed(() => this.taskService.taskToDisplay());

  backlogTasks = computed(() => {
    return this.filteredTasks().filter(t => t.status === TaskStatus.BACKLOG);
  })
  inProgressTasks = computed(() => {
    return this.filteredTasks().filter(t => t.status === TaskStatus.IN_PROGRESS);
  })
  doneTasks = computed(() => {
    return this.filteredTasks().filter(t => t.status === TaskStatus.DONE);
  })


  //עבור הניתובים בסוף
  private teamIdParam = toSignal(
    this.route.paramMap.pipe(map(params => params.get('teamId')))
  );

  readonly teamId = computed(() => Number(this.teamIdParam()));

  constructor() {
    effect(() => {
      const id = this.projectId();
      if (id) {
        this.taskService.loadTasks(id).subscribe();
        this.taskService.setFilter(id);
      }
      else{
        this.taskService.setFilter(null);
      }
    });
  }

  drop(event: CdkDragDrop<Task[]>, newStatus: TaskStatus) {
    if (event.previousContainer !== event.container) {
      const task = event.item.data as Task;
      this.taskService.updateTask(task.id,
        { status: newStatus, priority: task.priority }).subscribe();
    }
  }

  addTask(taskStatus: TaskStatus) {
    const dialogRef = this.dialog.open(AddTaskDialogComponent, {
      width: '450px',
      data: { projectId: this.projectId(), defaultStatus: taskStatus }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.createTask(result).subscribe();
      }
    })
  }

  onDeleteTask(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe();
  }

  onPriorityChanged(event: { id: number, priority: TaskPriority }) {
    this.taskService.updateTask(event.id,
      { priority: event.priority }).subscribe();
  }
  onOpenComments(taskId: number) {
    this.dialog.open(TaskCommentsDialogComponent, {
      width: '500px',
      maxWidth: '90vw',
      data: { taskId },
      autoFocus: false
    })
  }

  readonly breadcrumbs = computed<Breadcrumb[]>(() => [
  { label: 'Teams', url: '/teams' },
  { label: `Team #${this.teamId()}`, url: `/teams/${this.teamId()}/projects` },
  { label: `Project #${this.projectId()}` } 
]);

}


