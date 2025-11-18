import axios from 'axios';
import { PersonalInfo } from '@/Interface/TPersonalInfo';
import { WorkExpResponse } from '@/Interface/TWorkExp';
import { ProjectResponse } from '@/Interface/TProject';
import { Skill } from '@/Interface/TSkills';
import { Certificate } from '@/Interface/TCertificate';

const publicAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://portfolio-be-k3b0.onrender.com/api/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const publicApi = {
  checkUsername: async (username: string): Promise<{ available: boolean; message: string }> => {
    const url = `/public/check-username/${username}`;
    const res = await publicAxiosInstance.get(url);
    return res.data;
  },

  getPublicProfile: async (username: string): Promise<PersonalInfo> => {
    const url = `/public/profile/${username}`;
    const res = await publicAxiosInstance.get(url);
    return res.data;
  },

  getPublicWorkexp: async (
    username: string,
    pageIndex: number = 1,
    pageSize: number = 10
  ): Promise<WorkExpResponse> => {
    const url = `/public/profile/${username}/workexp?page_index=${pageIndex}&page_size=${pageSize}`;
    const res = await publicAxiosInstance.get(url);
    return res.data;
  },

  getPublicProjects: async (
    username: string,
    pageIndex: number = 1,
    pageSize: number = 10
  ): Promise<ProjectResponse> => {
    const url = `/public/profile/${username}/projects?page_index=${pageIndex}&page_size=${pageSize}`;
    const res = await publicAxiosInstance.get(url);
    return res.data;
  },

  getPublicSkills: async (username: string): Promise<Skill[]> => {
    const url = `/public/profile/${username}/skills`;
    const res = await publicAxiosInstance.get(url);
    return res.data;
  },

  getPublicCertificates: async (username: string): Promise<Certificate[]> => {
    const url = `/public/profile/${username}/certificates`;
    const res = await publicAxiosInstance.get(url);
    return res.data;
  },
};

