import { Component, computed, inject, input, output } from '@angular/core';
import { Project } from '../../../models/project.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { TasksComponent } from '../../tasksComponents/tasks/tasks.component';
import { Router } from '@angular/router';
import { TasksService } from '../../../services/tasks.service';
import { TaskStatus } from '../../../models/task.model';
import { MatDivider } from "@angular/material/divider";

@Component({
  selector: 'app-project-card',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    DatePipe,
    TitleCasePipe,
    MatDivider
],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.css',
})
export class ProjectCardComponent {

  project = input.required<Project>();
  teamId = input.required<string>();
  private router = inject(Router);

  private tasksService = inject(TasksService);
  taskCounts = computed(() => {
    const allTasks = this.tasksService.allTasks(); 
    const pid = this.project().id;
    
    const projectTasks = allTasks.filter(t => Number(t.project_id) === Number(pid));

    return {
      backlog: projectTasks.filter(t => t.status === TaskStatus.BACKLOG).length,
      inProgress: projectTasks.filter(t => t.status === TaskStatus.IN_PROGRESS).length,
      done: projectTasks.filter(t => t.status === TaskStatus.DONE).length
    };
  });

  goToTasks() {
    this.router.navigate((['/teams', Number(this.teamId()),'projects', this.project().id, 'board']));
  }

}
