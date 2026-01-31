import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TaskStatus } from '../../../models/task.model';
import { ProjectsService } from '../../../services/projects.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-task-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule
  ],
  templateUrl: './add-task-dialog.component.html',
  styleUrl: './add-task-dialog.component.scss',
})
export class AddTaskDialogComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<AddTaskDialogComponent>);
  protected projectsService = inject(ProjectsService);
  
  data=inject(MAT_DIALOG_DATA)

  taskForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(2)]],
    description: [''],
    priority: ['normal', Validators.required],
    status: [TaskStatus.BACKLOG, Validators.required],
    dueDate: [new Date().toISOString().split('T')[0], Validators.required],
    assigneeId: [1],
    orderIndex: [0],
    projectId: [this.data?.projectId || null, Validators.required]
  });

  ngOnInit(){
    if(this.data?.defaultStatus){
      this.taskForm.patchValue({status:this.data.defaultStatus})
    }
    if (!this.data?.projectId) {
      this.projectsService.loadProjects().subscribe();
    }
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const formValues = this.taskForm.value;
      const result = {
        ...formValues,
        projectId:Number(formValues.projectId),
      }
      this.dialogRef.close(result);
    }
    
  }

  onCancel() {
    this.dialogRef.close();
  }



}
