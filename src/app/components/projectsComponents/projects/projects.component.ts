import { Component, computed, inject, input } from '@angular/core';
import { ProjectsService } from '../../../services/projects.service';
import { TeamsService } from '../../../services/teams.service';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommonModule, Location } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateProjectDialogComponent } from '../create-project-dialog/create-project-dialog.component';
import { CreateProjectRequest } from '../../../models/project.model';
import { NotificationService } from '../../../services/notification.service';
import { Breadcrumb } from '../../../models/navigation.model';
import { PageNavigateComponent } from "../../page-navigate/page-navigate.component";
import { Team } from '../../../models/team.model';
import { MatProgressSpinner } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-projects',
  imports: [
    CommonModule,
    ProjectCardComponent,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    PageNavigateComponent,
    MatProgressSpinner
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  teamId = input.required<string>();

  protected projectsService = inject(ProjectsService);
  private teamService = inject(TeamsService);
  private location = inject(Location);

  private dialog = inject(MatDialog)
  private notification = inject(NotificationService)

  team = computed<Team>(() => {
    const id = Number(this.teamId());
    return this.teamService.teams().find(t => t.id === id)
  })

  ngOnInit() {
    if (this.teamId()) {
      this.teamService.selectTeam(Number(this.teamId()));
    }
    this.projectsService.loadProjects().subscribe()
  }

  goBack() {
    this.location.back();
  }

  onCreateProject(): void {
    const dialogRef = this.dialog.open(CreateProjectDialogComponent, {
      width: '500px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if (result)
          this.saveProject(result)
      }
    )
  }

  private saveProject(projectData: CreateProjectRequest): void {
    projectData.teamId = Number(this.teamId());
    this.projectsService.createProject(projectData).subscribe({
      next: (newProject) => {
        this.notification.success('Project created!')

      },
      error: (err) => {
        this.notification.error('Error creating project')
      }
    })
  }

  readonly breadcrumbs = computed<Breadcrumb[]>(() => [
    { label: 'Teams', url: '/teams' },
    { label: this.team()?.name || `Team #${this.teamId()}` }
  ]);
}
