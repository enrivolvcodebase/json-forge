export interface Metadata {
  createdAt: string;
  updatedAt: string;
  version: string;
}

export interface Breakdown {
  development: number;
  infrastructure: number;
  marketing: number;
}

export interface Budget {
  allocated: number;
  spent: number;
  currency: string;
  breakdown: Breakdown;
}

export interface Tasks {
  taskId: string;
  description: string;
  completed: boolean;
}

export interface Milestones {
  id: string;
  title: string;
  deadline: string;
  tasks: Tasks[];
}

export interface Team {
  memberId: number;
  name: string;
  role: string;
  skills: string[];
}

export interface Project {
  id: string;
  name: string;
  team: Team[];
  milestones: Milestones[];
  budget: Budget;
}

export interface ProjectData {
  project: Project;
  metadata: Metadata;
}