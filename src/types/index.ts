export interface Agent {
  id: string;
  name: string;
  role: string;
  status: 'idle' | 'working' | 'completed';
  goals: string[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  assignedAgents: Agent[];
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
}