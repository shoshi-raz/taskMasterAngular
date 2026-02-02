import { Routes } from '@angular/router';
import { LoginComponent } from './components/authComponents/login/login.component';
import { authGuard, guestGuard } from './guards/auth.guard';
import { RegisterComponent } from './components/authComponents/register/register.component';
import { TeamsComponent } from './components/teamsComponents/teams/teams.component';
import { ProjectsComponent } from './components/projectsComponents/projects/projects.component';
import { TaskBoardComponent } from './components/tasksComponents/task-board/task-board.component';
import { TasksComponent } from './components/tasksComponents/tasks/tasks.component';

export const routes: Routes = [
    { path: '', redirectTo: 'tasks', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, canActivate: [guestGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [guestGuard] },
    { path: 'teams', component: TeamsComponent, canActivate: [authGuard] },
    { path: 'teams/:teamId/projects', component: ProjectsComponent, canActivate: [authGuard] },
    { path: 'teams/:teamId/projects/:projectId/board', component: TaskBoardComponent, canActivate: [authGuard] },
    { path: 'tasks', component: TasksComponent, canActivate: [authGuard] },
    {path:'**',redirectTo:'tasks',pathMatch:'full'},

];

