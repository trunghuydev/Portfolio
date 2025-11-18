
import { 
  Login, 
  LoginResponse, 
  DevRegisterPayload, 
  DevRegisterResponse,
  RefreshTokenPayload,
  RefreshTokenResponse,
  TokenClaims
} from '@/Interface/auth';
import { PersonalInfo, UpdateProfileRs } from '@/Interface/TPersonalInfo';

import { ProjectResponse, ProjectUpdateResponse } from '@/Interface/TProject';
import { Skill } from '@/Interface/TSkills';
import {  WorkExperiencePayload, WorkExperienceUpdateRs, WorkExpResponse, WorkExpTaskCreate } from '@/Interface/TWorkExp';
import { Certificate, CertificateCreatePayload, CertificateUpdatePayload, CertificateResponse } from '@/Interface/TCertificate';
import { EmailPayload, EmailResponse } from '@/Interface/TEmail';
import { AxiosInstance } from 'axios';

export const docApi = (axiosInstance: AxiosInstance) => ({
  Login: async (body: Login): Promise<LoginResponse> => {
    const url = `/account/log-in`;
    const res = await axiosInstance.post(url, body);
    return res.data;
  },

  devRegister: async (body: DevRegisterPayload): Promise<DevRegisterResponse> => {
    const url = `/account/dev-register`;
    const res = await axiosInstance.post(url, body);
    return res.data;
  },

  refreshToken: async (body: RefreshTokenPayload): Promise<RefreshTokenResponse> => {
    const url = `/token/refresh`;
    const res = await axiosInstance.post(url, body);
    return res.data;
  },

  getTokenClaims: async (): Promise<TokenClaims> => {
    const url = `/token/claims`;
    const res = await axiosInstance.get(url);
    return res.data;
  },

  getProfile: async (): Promise<PersonalInfo> => {
    const url = `/profile`;
    const res = await axiosInstance.get(url);
    return res.data;
  },

  updateUsername: async (body: { username: string }): Promise<{ message: string; username: string }> => {
    const url = `/profile/username`;
    const res = await axiosInstance.patch(url, body);
    return res.data;
  },

  updateVisibility: async (body: { is_public: boolean }): Promise<{ message: string; is_public: boolean }> => {
    const url = `/profile/visibility`;
    const res = await axiosInstance.patch(url, body);
    return res.data;
  },


getWorkexp: async (pageIndex = 1, pageSize = 10): Promise<WorkExpResponse> => {
  const url = `/workexp?page_index=${pageIndex}&page_size=${pageSize}`;
  const res = await axiosInstance.get(url);
  return res.data;
},

getProject:async(pageIndex=1,pageSize=1):Promise<ProjectResponse>=>{
  const url=`/project?page_index=${pageIndex}&page_size=${pageSize}`;
  const res= await axiosInstance.get(url);
  return res.data;

},
getSkills:async():Promise<Skill[]>=>{
    const url =`/skill`;
    const res = await axiosInstance.get(url);
    return res.data;
},

  addSkill: async (body: { skill_name: string; position?: string }): Promise<Skill> => {
    const url = `/skill`;
    const res = await axiosInstance.post(url, body);
    return res.data;
  },

  updateSkill: async (skill_id: string, body: { skill_name?: string; position?: string }): Promise<Skill> => {
    const url = `/skill/${skill_id}`;
    const res = await axiosInstance.patch(url, body);
    return res.data;
  },

  deleteAllSkills: async (): Promise<{ message: string }> => {
    const url = `/skill`;
    const res = await axiosInstance.delete(url);
    return res.data;
  },

  deleteSkill: async (skill_id: string): Promise<{ message: string }> => {
    const url = `/skill/remove/${skill_id}`;
    const res = await axiosInstance.delete(url);
    return res.data;
  },

  createProject: async (formData: FormData): Promise<ProjectUpdateResponse> => {
    const url = `/project/create-project`;
    const res = await axiosInstance.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  },

  addCertificate: async (body: CertificateCreatePayload): Promise<Certificate> => {
    const url = `/certificate`;
    const res = await axiosInstance.post(url, body);
    return res.data;
  },

  updateCertificate: async (certificate_id: string, body: CertificateUpdatePayload): Promise<Certificate> => {
    const url = `/certificate/${certificate_id}`;
    const res = await axiosInstance.patch(url, body);
    return res.data;
  },

  deleteCertificate: async (certificate_id: string): Promise<CertificateResponse> => {
    const url = `/certificate/${certificate_id}`;
    const res = await axiosInstance.delete(url);
    return res.data;
  },

  sendEmail: async (body: EmailPayload): Promise<EmailResponse> => {
    const url = `/email`;
    const res = await axiosInstance.post(url, body);
    return res.data;
  },

editProfile: async (formData: FormData): Promise<UpdateProfileRs> => {
  const user_id = formData.get('user_id');
  const url = `/profile/${user_id}`;
  const res = await axiosInstance.patch(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
},
 updateWorkExperience: async (we_id: string, payload: WorkExperiencePayload):Promise<WorkExperienceUpdateRs> => {
    const res = await axiosInstance.patch(`/workexp/${we_id}`, payload);
    return res.data;
  },

  deleteWorkExperience: async (we_id: string):Promise<WorkExperienceUpdateRs> => {
    const res = await axiosInstance.delete(`/workexp/${we_id}`);
    return res.data;
  },
  createExperience:async(payloadWork:WorkExperiencePayload):Promise<WorkExperienceUpdateRs>=>{
      const res = await axiosInstance.post(`/workexp`, payloadWork);
      return res.data;
  },
   updateProject: async (
    project_id: string,
    formData: FormData
  ): Promise<ProjectUpdateResponse> => {
    const url = `/project/${project_id}`;
    const res = await axiosInstance.patch(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  },
   deleteProject: async (project_id: string): Promise<ProjectUpdateResponse> => {
    const url = `/project/${project_id}`;
    const res = await axiosInstance.delete(url);
    return res.data;
  },
 
 createMyTask: async (body: WorkExpTaskCreate, we_id: string): Promise<WorkExperienceUpdateRs> => {
    const url = `/mytask/${we_id}`;
    const res = await axiosInstance.post(url, body);
    return res.data;
  },

  
  deleteMytask: async (mt_id: string): Promise<WorkExperienceUpdateRs> => {
    const url = `/mytask/${mt_id}`;
    const res = await axiosInstance.delete(url);
    return res.data;
  },

 
  editMytask: async (body: { task_description: string }, we_id: string): Promise<WorkExperienceUpdateRs> => {
    const url = `/mytask/update/${we_id}`; 
    const res = await axiosInstance.patch(url, body);
    return res.data;
  },

  uploadImage: async (formData: FormData): Promise<{ url: string }> => {
    const url = `/storage/upload`;
    const res = await axiosInstance.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  },

});
