export enum TaskStatus {
  BACKLOG = 'backlog',
  IN_PROGRESS = 'in_progress',
  DONE = 'done'
}
export enum TaskPriority {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high'
}

export interface Task {
  id: number;
  project_id: number;
  title: string;
  description: string;
  status: TaskStatus; 
  priority: 'low' | 'normal' | 'high';
  assignee_id?: number;
  due_date: string;
  order_index: number;
}

export interface CreateTaskRequest {
  projectId: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  assigneeId: number;
  dueDate: string;
  orderIndex: number;
}