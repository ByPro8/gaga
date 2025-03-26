export interface ProjectEntry {
  role: string;
  title: string;
  company: string;
}

export interface ProjectYear {
  year: number;
  entries: ProjectEntry[];
}
