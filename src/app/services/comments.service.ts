import { inject, Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/internal/operators/tap';
import { catchError } from 'rxjs/internal/operators/catchError';
import { finalize } from 'rxjs/internal/operators/finalize';
import { TaskComment } from '../models/comment.model';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private apiService = inject(ApiService);

  private commentsSignal = signal<TaskComment[]>([]);
  readonly currentComments = this.commentsSignal.asReadonly();

  private isLoadingSignal = signal<boolean>(false);
  readonly isLoading = this.isLoadingSignal.asReadonly();

  loadComments(taskId: number): Observable<TaskComment[]> {
    this.isLoadingSignal.set(true);
    this.commentsSignal.set([]);

    return this.apiService.get<TaskComment[]>(`api/comments?taskId=${taskId}`).pipe(
      tap(comments => this.commentsSignal.set(comments)),
      catchError(this.apiService.handleError('Failed to load comments')),
      finalize(() => this.isLoadingSignal.set(false))
    );
  }

  addComment(taskId: number, body: string): Observable<TaskComment> {
    return this.apiService.post<TaskComment>('api/comments', { taskId, body }).pipe(
      tap(newComment => {
        this.commentsSignal.update(current => [...current, newComment]);
      }),
      catchError(this.apiService.handleError('Failed to add comment'))
    );
  }
}
