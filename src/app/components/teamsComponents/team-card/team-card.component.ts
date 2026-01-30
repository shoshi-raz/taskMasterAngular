import { Component, input, output } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Team } from '../../../models/team.model';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-team-card',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    UpperCasePipe,
    DatePipe,
    MatTooltipModule
  ],
  templateUrl: './team-card.component.html',
  styleUrl: './team-card.component.css',
})
export class TeamCardComponent {
  team = input.required<Team>();
  select = output<number>();
  addMemberClick = output<Team>();
  viewProject = output<number>();

  onAddMember(event: Event) {
    event.stopPropagation();
    this.addMemberClick.emit(this.team());
  }

  onViewProject(event: Event) {
    event.stopPropagation();
    this.viewProject.emit(this.team().id);
    }

  onCardClick() {
    this.select.emit(this.team().id);
  }
}
