import { computed, inject, Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';
import { CreateTaskRequest, Task } from '../models/task.model';
import { catchError, EMPTY, finalize, Observable, tap, throwError } from 'rxjs';
import { NotificationService } from './notification.service';
import { Team } from '../models/team.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {

  private apiService = inject(ApiService)
  private notification = inject(NotificationService)

  private tasksSignal = signal<Task[]>([])
  readonly allTasks = this.tasksSignal.asReadonly();

  private isFullyLoaded = signal<boolean>(false);

  private currentViewProjectId = signal<number | null>(null);

  readonly taskToDisplay = computed(() => {
    const pid = this.currentViewProjectId();
    const all = this.tasksSignal();
    return pid ? all.filter(t => Number(t.project_id) === Number(pid)) : all;
  });

  setFilter(projectId: number | null) {
    this.currentViewProjectId.set(projectId);
  }

  private loadingSignal = signal<boolean>(false);
  readonly isLoading = this.loadingSignal.asReadonly();

  loadTasks(projectId?: number, forceRefresh: boolean = false): Observable<Task[]> {

    const alreadyHasEverything = this.isFullyLoaded();

    const hasProjectData = projectId && this.tasksSignal().some(t => Number(t.project_id) === Number(projectId))
    if (!forceRefresh && (alreadyHasEverything || hasProjectData)) return EMPTY

    const url = projectId ? `api/tasks?projectId=${projectId}` : 'api/tasks';
    this.loadingSignal.set(true);

    return this.apiService.get<Task[]>(url).pipe(
      tap(tasks => {
        this.tasksSignal.update(current => {
          if (!projectId) {
            this.isFullyLoaded.set(true)
            return tasks
          }
          const otherTasks = current.filter(t => Number(t.project_id) !== Number(projectId))
          return [...otherTasks, ...tasks]
        })
      }),
      catchError(this.apiService.handleError('Failed to load tasks')),
      finalize(() => {
        this.loadingSignal.set(false);
      })
    )
  }

  createTask(taskData: CreateTaskRequest): Observable<Task> {
    return this.apiService.post<Task>('api/tasks', taskData).pipe(
      tap(newTask => {
        this.tasksSignal.update(current => [...current, newTask])
        this.notification.success('Task created successfully');
      }),
      catchError(this.apiService.handleError('Failed to create tasks')));
  }

  updateTask(id: number, changes: Partial<Task>): Observable<Task> {
    return this.apiService.patch<Task>(`api/tasks/${id}`, changes).pipe(
      tap(updateTask => {
        this.tasksSignal.update(current =>
          current.map(t => t.id === id ? updateTask : t)
        )
      }),
      catchError(this.apiService.handleError('Failed to update tasks')));
  }

  deleteTask(id: number): Observable<void> {
    return this.apiService.delete<void>(`api/tasks/${id}`).pipe(
      tap(() => {
        this.tasksSignal.update(current => current.filter(t => t.id !== id))
        this.notification.success('Task deleted successfully');
      }),
      catchError(this.apiService.handleError('Failed to delete tasks')))
  }

  refreshTasks(projectId: number | null) {
    this.loadTasks(projectId, true).subscribe()
  }

  clearTasks() {
    this.tasksSignal.set([])
    this.isFullyLoaded.set(false)
  }

}
