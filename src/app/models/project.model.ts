export interface Project {
  id: number;
  team_id: number;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'on-hold';
  created_at: string;
}

export interface CreateProjectRequest {
  teamId?: number;
  name: string;
  description: string;
}