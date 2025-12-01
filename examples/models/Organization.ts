export interface Stats {
  totalEmployees: number;
  departments: number;
}

export interface Members {
  id: number;
  name: string;
}

export interface Teams {
  teamId: string;
  teamName: string;
  members: Members[];
}

export interface Departments {
  deptId: string;
  name: string;
  teams: Teams[];
}

export interface Organization {
  departments: Departments[];
}

export interface Organization {
  organization: Organization;
  tags: string[];
  stats: Stats;
}