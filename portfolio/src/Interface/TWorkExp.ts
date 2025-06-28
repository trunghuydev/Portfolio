export type WorkExpTask = {
  mt_id: string;
  task_description: string;
};

export type WorkExp = {
  we_id: string;
  user_id: string;
  company_name: string;
  position: string;
  duration: string;
  description: string;
  project_id: string | null;
  tasks: WorkExpTask[];
};

export type WorkExpResponse = {
  total_item: number;
  data: WorkExp[];
};

export type WorkExperiencePayload = {
  project_id: string;
  description: string;
  company_name: string;
  duration: string;
  position: string;
};



export type WorkExperienceUpdateRs ={
  stCode:number;
  message:string
}