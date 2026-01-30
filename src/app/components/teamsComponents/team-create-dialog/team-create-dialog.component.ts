import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef,MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-team-create-dialog',
  imports: [
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule

  ],
  templateUrl: './team-create-dialog.component.html',
  styleUrl: './team-create-dialog.component.css',
})
export class TeamCreateDialogComponent {
  teamName: string = '';
  private readonly dialogRef = inject(MatDialogRef<TeamCreateDialogComponent>);

onCreate(){
    if(this.teamName.trim()){
      this.dialogRef.close(this.teamName.trim());
    }
}


  onCancel() {  
    this.dialogRef.close();
  }

}
