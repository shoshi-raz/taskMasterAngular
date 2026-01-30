import { computed, inject, Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';
import { CreateProjectRequest, Project } from '../models/project.model';
import { TeamsService } from './teams.service';
import { tap } from 'rxjs/internal/operators/tap';
import { catchError, EMPTY, finalize, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private apiService = inject(ApiService);
  private teamsService = inject(TeamsService);

  private projectsSignal = signal<Project[]>([]);
  readonly allProjects = this.projectsSignal.asReadonly();

  readonly projectsByTeam = computed(() => {
    const selectedTeamId = this.teamsService.selectedTeam();
    if (selectedTeamId === null) {
      return [];
    }
    return this.projectsSignal().filter(
      (project) => project.team_id === selectedTeamId
    );
  });

  private isLoadingSignal = signal<boolean>(false);
  readonly isLoading = this.isLoadingSignal.asReadonly();

  loadProjects(forceRefresh: boolean = false): Observable<Project[]> {
    if (!forceRefresh && this.isLoadingSignal()) return EMPTY;
    this.isLoadingSignal.set(true);

    return this.apiService.get<Project[]>('api/projects').pipe(
      tap(projects => this.projectsSignal.set(projects)),
      catchError(this.apiService.handleError('Failed to load projects')),
      finalize(() => {
        this.isLoadingSignal.set(false);
      })

    )
  }
  createProject(projectDAta: CreateProjectRequest): Observable<Project> {
    return this.apiService.post<Project>('api/projects', projectDAta).pipe(
      tap(newProject => {
        this.projectsSignal.update(current => [...current, newProject])
      }),
        catchError(this.apiService.handleError('Failed to create projects'))
    )
  }
  refreshProjects() {
    this.loadProjects(true).subscribe();
  }

  clearProjects() {
    this.projectsSignal.set([]);
  }

}
