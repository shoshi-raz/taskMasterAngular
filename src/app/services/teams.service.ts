import { inject, Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';
import { AddMemberRequest, Team } from '../models/team.model';
import { catchError, EMPTY, finalize, Observable, tap, throwError } from 'rxjs';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  private apiService = inject(ApiService);
  private notification = inject(NotificationService);

  private teamsSignal = signal<Team[]>([]);
  readonly teams = this.teamsSignal.asReadonly();

  private selectedTeamSignal = signal<number | null>(null);
  readonly selectedTeam = this.selectedTeamSignal.asReadonly();

  private isLoadingSignal = signal<boolean>(false);
  readonly isLoading = this.isLoadingSignal.asReadonly();

  loadTeams(forceRefresh: boolean = false): Observable<Team[]> {
    if (!forceRefresh && (this.isLoadingSignal() || this.teamsSignal().length > 0)) return EMPTY;

    this.isLoadingSignal.set(true);

    return this.apiService.get<Team[]>('api/teams').pipe(
      tap((teams) =>
        this.teamsSignal.set(teams)),
      catchError(this.apiService.handleError('Failed to load teams')),
      finalize(() => {
        this.isLoadingSignal.set(false);
      })

    )
  }

  createTeam(name: string): Observable<Team> {
    return this.apiService.post<Team>('api/teams', { name }).pipe(
      tap((newTeam: Team) => {
        this.teamsSignal.update((current) => [...current, newTeam]);
        this.notification.success('Team created successfully');
      }),
      catchError(this.apiService.handleError('Failed to create teams')),

    );
  }

  addMember(teamId: number, memberData: AddMemberRequest): Observable<any> {
    return this.apiService.post(`api/teams/${teamId}/members`, memberData).pipe(
      tap(() => {
        this.refreshTeams();
        this.notification.success('Member added successfully');
      }),
      catchError(this.apiService.handleError('Failed to add member')),

    );
  }

  selectTeam(teamId: number): void {
    this.selectedTeamSignal.set(teamId);
  }

  refreshTeams(): void {
    this.loadTeams(true).subscribe();
  }

  clearTeams(): void {
    this.teamsSignal.set([]);
    this.selectedTeamSignal.set(null);
  }
}
