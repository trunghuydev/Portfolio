// src/api/docApi.ts
import { Login, LoginResponse } from '@/Interface/auth';
import { PersonalInfo } from '@/Interface/TInformation';
import { ProjectResponse } from '@/Interface/TProject';
import {  WorkExpResponse } from '@/Interface/TWorkExp';
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


getWorkexp: async (pageIndex = 1, pageSize = 1): Promise<WorkExpResponse> => {
  const url = `/workexp?page_index=${pageIndex}&page_size=${pageSize}`;
  const res = await axiosInstance.get(url);
  return res.data;
},

getProject:async(pageIndex=1,pageSize=1):Promise<ProjectResponse>=>{
  const url=`/project?page_index=${pageIndex}&page_size=${pageSize}`;
  const res= await axiosInstance.get(url);
  return res.data;

},


});
