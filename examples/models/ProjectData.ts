export interface ProjectDataMetadata {
  createdAt: string;
  updatedAt: string;
  version: string;
}

export interface ProjectDataProjectBudgetBreakdown {
  development: number;
  infrastructure: number;
  marketing: number;
}

export interface ProjectDataProjectBudget {
  allocated: number;
  spent: number;
  currency: string;
  breakdown: ProjectDataProjectBudgetBreakdown;
}

export interface ProjectDataProjectMilestonesItemTasksItem {
  taskId: string;
  description: string;
  completed: boolean;
}

export interface ProjectDataProjectMilestonesItem {
  id: string;
  title: string;
  deadline: string;
  tasks: ProjectDataProjectMilestonesItemTasksItem[];
}

export interface ProjectDataProjectTeamItem {
  memberId: number;
  name: string;
  role: string;
  skills: string[];
}

export interface ProjectDataProject {
  id: string;
  name: string;
  team: ProjectDataProjectTeamItem[];
  milestones: ProjectDataProjectMilestonesItem[];
  budget: ProjectDataProjectBudget;
}

export interface ProjectData {
  project: ProjectDataProject;
  metadata: ProjectDataMetadata;
}