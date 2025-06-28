export interface PersonalInfo {
  user_id: string;
  fullname: string;
  university_name: string;
  address: string;
  phone_number: string;
  github: string;
  dob: string;
  avatar: string;
  gpa: number;
  email: string;
  workExpOfYear: number | string | null; 
  linkedin_url: string | null;
  mindset: string | null;
  position_career: string | null;
  background: string | null;
  facebook_url: string | null;
  certificates: any[]; 
}



export type UpdateProfileRs ={
  stCode:number;
  message:string
}