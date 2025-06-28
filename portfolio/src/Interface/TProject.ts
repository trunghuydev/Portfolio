export type Tech= {
  tech_name: string;
}

export type Project= {
  project_id: string;
  project_name: string;
  description: string;
  project_type: string;
  is_Reality: boolean;
  url_project: string;
  url_demo: string;
  img_url: string;
  url_github: string;
  duration: string;
  from: string;
  to: string;
  url_contract?:string;
  url_excel?:string;
  teches: Tech[];
}

export type ProjectResponse ={
  total_item: number;
  data: Project[];
}

export type ProjectUpdateResponse={
  stcode:string;
  message:string
}