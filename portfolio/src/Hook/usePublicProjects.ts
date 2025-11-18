import { useQuery } from '@tanstack/react-query';
import { publicApi } from '@/api/publicApi';
import { QueryKeys } from '@/Constants/query-key';
import { ProjectResponse } from '@/Interface/TProject';

export const usePublicProjects = (username: string, pageIndex: number = 1, pageSize: number = 10) => {
  return useQuery<ProjectResponse>({
    queryKey: [QueryKeys.PUBLIC_PROJECTS, username, pageIndex],
    queryFn: () => publicApi.getPublicProjects(username, pageIndex, pageSize),
    enabled: !!username,
  });
};

