
import { Login, LoginResponse } from '@/Interface/auth';
import { PersonalInfo, UpdateProfileRs } from '@/Interface/TPersonalInfo';

import { ProjectResponse, ProjectUpdateResponse } from '@/Interface/TProject';
import { Skill } from '@/Interface/TSkills';
import {  WorkExperiencePayload, WorkExperienceUpdateRs, WorkExpResponse, WorkExpTaskCreate, WorkExpTaskUpdateBody } from '@/Interface/TWorkExp';
import { AxiosInstance } from 'axios';

export const docApi = (axiosInstance: AxiosInstance) => ({
  Login: async (body: Login): Promise<LoginResponse> => {
    const url = `/account/log-in`;
    const res = await axiosInstance.post(url, body);
    return res.data;
  },

  getProfile: async (): Promise<PersonalInfo> => {
    const url = `/profile`;
    const res = await axiosInstance.get(url);
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
  const url =`/skill`
  const res = await axiosInstance.get(url)
  return res.data
},
  /*--------------------------------------ADmin---------------------------------------------------------------- */
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

  // DELETE: dùng mt_id trên URL
  deleteMytask: async (mt_id: string): Promise<WorkExperienceUpdateRs> => {
    const url = `/mytask/${mt_id}`;
    const res = await axiosInstance.delete(url);
    return res.data;
  },

  // UPDATE: body là WorkExpTask (CÓ mt_id + task_description)
  editMytask: async (body: WorkExpTaskUpdateBody, we_id: string): Promise<WorkExperienceUpdateRs> => {
    const url = `/mytask/update/${we_id}`; 
    const res = await axiosInstance.patch(url, body);
    return res.data;
  },

});
