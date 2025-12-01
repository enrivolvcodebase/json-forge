export interface OrganizationStats {
  totalEmployees: number;
  departments: number;
}

export interface OrganizationOrganizationDepartmentsItemTeamsItemMembersItem {
  id: number;
  name: string;
}

export interface OrganizationOrganizationDepartmentsItemTeamsItem {
  teamId: string;
  teamName: string;
  members: OrganizationOrganizationDepartmentsItemTeamsItemMembersItem[];
}

export interface OrganizationOrganizationDepartmentsItem {
  deptId: string;
  name: string;
  teams: OrganizationOrganizationDepartmentsItemTeamsItem[];
}

export interface OrganizationOrganization {
  departments: OrganizationOrganizationDepartmentsItem[];
}

export interface Organization {
  organization: OrganizationOrganization;
  tags: string[];
  stats: OrganizationStats;
}