import { Component, inject, input, output } from '@angular/core';
import { Project } from '../../../models/project.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { TasksComponent } from '../../tasksComponents/tasks/tasks.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-card',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    DatePipe,
    TitleCasePipe,
  ],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.css',
})
export class ProjectCardComponent {

  project = input.required<Project>();
  teamId = input.required<string>();
  private router = inject(Router);

  goToTasks() {
    this.router.navigate((['/teams', Number(this.teamId()),'projects', this.project().id, 'board']));
  }

}
