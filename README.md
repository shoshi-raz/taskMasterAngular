# 📋 TaskMaster - Team Task Management System

A modern Angular 20 application for collaborative team task management, inspired by ClickUp.

## ✨ Features

- **Authentication**: User registration/login with JWT tokens
- **Teams**: Create and manage teams with members
- **Projects**: Organize work into projects within teams
- **Task Board**: Kanban-style board for task management (Create, Update, Delete)
- **Comments**: Add comments to tasks for team collaboration
- **Material Design**: Modern UI with light/dark mode support

## 🛠️ Tech Stack

- Angular 20 (Standalone Components)
- Angular Material Design
- SCSS with CSS Variables
- Reactive Forms
- JWT Authentication

## 📱 Screens

1. **Auth**: Login/Register with email and password
2. **Teams**: List all teams and create new ones
3. **Projects**: View projects within selected team
4. **Task Board**: Kanban board with task management

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
ng serve

# Navigate to http://localhost:4200/
```

## 🔌 API Endpoints

### Auth
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login user

### Teams (Protected)
- `GET /api/teams` - Get user's teams
- `POST /api/teams` - Create team
- `POST /api/teams/:teamId/members` - Add member

### Projects (Protected)
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project

### Tasks (Protected)
- `GET /api/tasks` - Get tasks (query: ?projectId=<id>)
- `POST /api/tasks` - Create task
- `PATCH /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Comments (Protected)
- `GET /api/comments` - Get task comments (query: ?taskId=<id>)
- `POST /api/comments` - Add comment

## 🔒 Security

- JWT token-based authentication
- Protected routes with auth guard
- Bearer token authorization header
- Token stored in localStorage

## 📁 Structure

```
src/app/
├── components/  (Auth, Teams, Projects, Tasks, Dialogs)
├── services/    (Auth, Team, Project, Task)
├── guards/      (Auth guard)
└── interceptors/ (HTTP interceptor for tokens)
```

## 🎨 Styling

- Material Design 3 components
- SCSS variables system
- Dark/Light theme support
- Responsive design

## 📝 Notes

- Backend server required (Node.js)
- CORS must be properly configured
- API base URL configurable in environment files

## 👨‍💻 Developer

**Owner**: shoshi-raz | **Repo**: taskMasterAngular | **Branch**: main

---

**Last Updated**: January 2026 | **Version**: 1.0.0
