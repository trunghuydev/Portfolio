

// Base chỉ có nội dung task
export type WorkExpTaskBase = {
  task_description: string;
};

// Task đã tồn tại (BE trả về) — luôn có mt_id
export type WorkExpTask = WorkExpTaskBase & {
  mt_id: string;
};

// Payload khi CREATE — KHÔNG có mt_id
export type WorkExpTaskCreate = WorkExpTaskBase;
export type WorkExpTaskUpdateBody = {
  myTask_id: string;
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

export type WorkExperienceUpdateRs = {
  stCode: number;
  msg: string;
};
