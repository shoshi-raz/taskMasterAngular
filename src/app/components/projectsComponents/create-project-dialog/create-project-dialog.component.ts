import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-create-project-dialog',
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './create-project-dialog.component.html',
  styleUrl: './create-project-dialog.component.css',
})
export class CreateProjectDialogComponent {
  private fb=inject(FormBuilder)
  private dialogRef = inject(MatDialogRef<CreateProjectDialogComponent>);

  projectForm=this.fb.group({
    name:['',[Validators.required,Validators.minLength(3)]],
    description:['',Validators.required]
  })

  onCancel():void{
    this.dialogRef.close();
  }

  onSubmit():void{
    if(this.projectForm.valid){
      this.dialogRef.close(this.projectForm.value)
    }
  }

}
