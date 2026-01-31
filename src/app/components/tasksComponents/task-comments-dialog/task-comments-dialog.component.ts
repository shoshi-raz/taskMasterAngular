import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { CommentsService } from '../../../services/comments.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-task-comments-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule
  ],
  templateUrl: './task-comments-dialog.component.html',
  styleUrl: './task-comments-dialog.component.scss'
})
export class TaskCommentsDialogComponent implements OnInit {
  protected commentsService = inject(CommentsService);
  protected authService = inject(AuthService)
  private data = inject(MAT_DIALOG_DATA); 
  protected readonly dialogRef = inject(MatDialogRef<TaskCommentsDialogComponent>);

  readonly comments = this.commentsService.currentComments;

  
  newCommentBody = '';

  ngOnInit(): void {
    if (this.data.taskId) {
      this.commentsService.loadComments(this.data.taskId).subscribe();
    }
  }

  sendComment(): void {
    const body = this.newCommentBody.trim();
    if (!body) return;

    const currentUser = this.authService.getCurrentUser();

    if (!currentUser) return;

    this.commentsService.addComment(this.data.taskId, body).subscribe({
      next: (newComment) => {

        newComment.author_name = currentUser.name;
        this.newCommentBody = ''; 
        this.scrollToBottom(); 
      },
      error: (err) => {
        console.error('Failed to post comment:', err);
      }
    });
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      const container = document.querySelector('.comments-container');
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }, 100);
  }
}