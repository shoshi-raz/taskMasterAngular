import { Component, computed, inject, input, signal } from '@angular/core';
import { TasksService } from '../../../services/tasks.service';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TaskBoardComponent } from '../task-board/task-board.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { ProjectsService } from '../../../services/projects.service';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskDialogComponent } from '../add-task-dialog/add-task-dialog.component';
import { PageNavigateComponent } from "../../page-navigate/page-navigate.component";

@Component({
  selector: 'app-tasks',
  imports: [
    CommonModule,
    TaskBoardComponent,
    MatFormFieldModule,
    MatSelectModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    PageNavigateComponent
],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent {
  protected tasksService = inject(TasksService)
  protected projectService = inject(ProjectsService);
  protected dialog = inject(MatDialog)

  selectedProjectId = signal<number | null>(null);

  ngOnInit() {
    this.tasksService.loadTasks().subscribe();
    this.projectService.loadProjects().subscribe();
  }

  onProjectFilterChange(projectId: number | null): void {
    this.selectedProjectId.set(projectId);
    this.tasksService.setFilter(projectId);
  }

  openAddTaskDialog() {
    const dialogRef = this.dialog.open(AddTaskDialogComponent, {
      width: '500px',
      data: {
        projectId: this.selectedProjectId(), 
        defaultStatus: 'backlog'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveTask(result);
      }
    });
  }

  private saveTask(taskData: any) {
    this.tasksService.createTask(taskData).subscribe();
  }

  breadcrumbs= computed(() => {
    return [
      { label: 'Tasks', url: `/tasks` }
    ] 
  })
}
