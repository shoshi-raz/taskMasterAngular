import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogClose, MatDialogTitle, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { Team } from '../../../models/team.model';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-member-dialog',
  imports: [
     MatDialogTitle, 
     MatDialogContent, 
     MatDialogActions,
     ReactiveFormsModule,
     MatFormFieldModule,
     MatButtonModule,
     MatInputModule

     
    ],
  templateUrl: './add-member-dialog.component.html',
  styleUrl: './add-member-dialog.component.css',
})
export class AddMemberDialogComponent {
  private fb=inject(FormBuilder);
  private dialogRef=inject(MatDialogRef<AddMemberDialogComponent>);

  protected data=inject<{team:Team}>(MAT_DIALOG_DATA)


  memberForm=this.fb.group({
    userId:[null as number|null,Validators.required]
  });

  onSubmit(){
    if(this.memberForm.invalid)return;
    this.dialogRef.close(this.memberForm.value);
  }
  OnCancel(){
    this.dialogRef.close();
  }

}
