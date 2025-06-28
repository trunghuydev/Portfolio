import { useQuery } from '@tanstack/react-query';
import { createAxiosClient } from '@/api/axiosClient';
import { docApi } from '@/api/docApi';
import { QueryKeys } from '@/Constants/query-key';
import { WorkExpResponse } from '@/Interface/TWorkExp';

export const useWorkexp = (accessToken: string, pageIndex: number, pageSize = 10) => {
  const api = docApi(createAxiosClient(accessToken));
  return useQuery<WorkExpResponse>({
    queryKey: [QueryKeys.WORKEXP, pageIndex, accessToken],
    queryFn: () => api.getWorkexp(pageIndex, pageSize),
    placeholderData: (previousData) => previousData,
    enabled: !!accessToken,
  });
};
