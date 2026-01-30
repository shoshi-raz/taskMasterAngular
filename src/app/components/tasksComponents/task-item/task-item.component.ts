import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { Task, TaskPriority } from '../../../models/task.model';

import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule, 
    MatTooltipModule,
    MatChipsModule,
    MatMenuModule
  ],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})
export class TaskItemComponent {
  task = input.required<Task>();

  priorityChanged=output<{id: number, priority: TaskPriority}>()
  readonly priorities :TaskPriority[]= [TaskPriority.LOW, TaskPriority.NORMAL, TaskPriority.HIGH];

  delete = output<number>();
  openComments = output<number>();

  onDeleteClick(){
      this.delete.emit(this.task().id);
  }

  onPrioritySelect(newPriority: TaskPriority) {
    if(this.task().priority !== newPriority) {
      this.priorityChanged.emit({id: this.task().id, priority: newPriority});
    }
  }

}