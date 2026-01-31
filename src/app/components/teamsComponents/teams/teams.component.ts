import { Component, computed, inject, output } from '@angular/core';
import { TeamsService } from '../../../services/teams.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TeamCreateDialogComponent } from '../team-create-dialog/team-create-dialog.component';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TeamCardComponent } from '../team-card/team-card.component';
import { AddMemberRequest, Team } from '../../../models/team.model';
import { AddMemberDialogComponent } from '../add-member-dialog/add-member-dialog.component';
import { CommonModule } from '@angular/common';
import { LoadingIconComponent } from '../../UIcomponents/loading-icon/loading-icon.component';
import { Breadcrumb } from '../../../models/navigation.model';
import { PageNavigateComponent } from "../../page-navigate/page-navigate.component";

@Component({
  selector: 'app-teams',
  imports: [
    CommonModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    TeamCardComponent,
    PageNavigateComponent
],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.scss',
})
export class TeamsComponent {
  protected readonly teamsService = inject(TeamsService);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);

  readonly breadcrumbs = computed<Breadcrumb[]>(() => [
    { label: 'Teams', url: '/teams' }
  ]);

  ngOnInit() {
    this.teamsService.loadTeams().subscribe();
  }

  onTeamClick(teamId: number) {
    this.teamsService.selectTeam(teamId);
    this.router.navigate(['/teams', teamId, 'projects']);
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(TeamCreateDialogComponent,
      { width: '450px', disableClose: true });

    dialogRef.afterClosed().subscribe(name => {
      if (name) {
        this.teamsService.createTeam(name).subscribe({
          next: () => { },
          error: (err) => {
            console.error('Create team error:', err);
          }

        });
      }
    });
  }

  openAddMemberDialog(team: Team) {
    const dialogRef = this.dialog.open(AddMemberDialogComponent,
      { width: '400px', disableClose: true, data: { team } });

    dialogRef.afterClosed().subscribe(
      (result: AddMemberRequest) => {
        if (result) {
          this.teamsService.addMember(team.id, result).subscribe({
            next: () => { },

            error: (err) => {
              console.error('Add member error:', err);
            }
          });
        }
      })

  }

  onViewTeamProject(teamId: number) {
    this.teamsService.selectTeam(teamId);
    this.router.navigate(['/teams', teamId, 'projects']);
  }

}
