import { computed, inject, Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { AuthResponse, User } from '../models/auth.model';
import { ProjectsService } from './projects.service';
import { TasksService } from './tasks.service';
import { TeamsService } from './teams.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiService = inject(ApiService);

  private tokenKey: string = 'auth_token';
  private useKey: string = 'auth_user';

  private userBehavior = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.userBehavior.asObservable()



  public isLoggedIn$: Observable<boolean> = this.currentUser$.pipe(
    map(user => !!user)
  );

  constructor() {
    const savedUser = sessionStorage.getItem(this.useKey);
    if (savedUser) {
      try {
        const userObj = JSON.parse(savedUser);
        this.userBehavior.next(userObj);
      }
      catch (err) {
      }
    } 
  }

  saveDetails(authResponse: AuthResponse) {
    sessionStorage.setItem(this.tokenKey, authResponse.token);
    sessionStorage.setItem(this.useKey, JSON.stringify(authResponse.user));
    this.userBehavior.next(authResponse.user);
  }

  register(userData: User): Observable<AuthResponse> {
    return this.apiService.post<AuthResponse>('api/auth/register', userData).pipe(
      tap(res => this.saveDetails(res))
    )
  }

  login(userData: User): Observable<AuthResponse> {
    return this.apiService.post<AuthResponse>('api/auth/login', userData).pipe(
      tap(res => this.saveDetails(res))
    )
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  logout(): void {
    sessionStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.useKey);
    window.location.href = '/login';

  }
  public isLoggedIn(): boolean {
    return !!this.userBehavior.value;
  }

  public getCurrentUser(): User | null {
    return this.userBehavior.value;
  }

}