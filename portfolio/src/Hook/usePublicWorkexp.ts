import { useQuery } from '@tanstack/react-query';
import { publicApi } from '@/api/publicApi';
import { QueryKeys } from '@/Constants/query-key';
import { WorkExpResponse } from '@/Interface/TWorkExp';

export const usePublicWorkexp = (username: string, pageIndex: number = 1, pageSize: number = 10) => {
  return useQuery<WorkExpResponse>({
    queryKey: [QueryKeys.PUBLIC_WORKEXP, username, pageIndex],
    queryFn: () => publicApi.getPublicWorkexp(username, pageIndex, pageSize),
    placeholderData: (previousData) => previousData,
    enabled: !!username,
  });
};

